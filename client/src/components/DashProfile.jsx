
import React, { useEffect } from 'react'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import app from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {
  updateStart,
  updateFaliure,
  updateSucess,
  deleteUserStart,
  deleteUserSucess,
  deleteUserFaliure,
  signOutUserSucess
} from '../app/slice/userSlice';
import { Alert } from 'flowbite-react'
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Button, Modal } from "flowbite-react";
import {Link} from 'react-router-dom'



function DashProfile() {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user.currentUser)
  const sliceError = useSelector((state) => state.user.error)
  const [imageFile, setimageFile] = useState(null)
  const [imageFileUrl, setimageFileUrl] = useState(null)
  const imagePickerRef = useRef(null)
  const [imageUploadProgress, setimageUploadProgress] = useState(0)
  const [imageUploadError, setimageUploadError] = useState(null)
  const [formData, setFormData] = useState({});
  const [imageFileUploading, setImagefileUploading] = useState(false)
  const [updateuserSucess, setUpdateUserSucess] = useState(null)
  const [alert, setAlert] = useState(false)
  const [errormsg, setErrormsg] = useState(null)
  const [showModel, setshowModel] = useState(false)
 
  
 
  
  


  function handleImageChange(e) {
    const file = e.target.files[0]
    if (file) {
      setimageFile(file);
      setimageFileUrl(URL.createObjectURL(file));

    }
  }

  useEffect(() => {
    if (imageFile) {
      uploadImage()
    }
  }, [imageFile])

  const uploadImage = async () => {
    setImagefileUploading(true)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + imageFile.name;
    console.log(fileName);
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, imageFile)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100);
        setimageUploadProgress(progress.toFixed(0))
      },
      (error) => {
        setimageUploadError('Image must have the size under 2mb')
        setImagefileUploading(false)
      }
      ,
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURl) => {
          setimageFileUrl(downloadURl)
          setFormData({ ...formData, photo: downloadURl })
          setImagefileUploading(false)
        })
      }
    )

  }



  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  async function handleSubmit(e) {
    e.preventDefault;
    console.log('button clicked')
    if (imageFileUploading) {
      setErrormsg('wait while the image is uploading')
      return
    }
    if (Object.keys(formData).length > 0) {

      try {
        //dispatch Start
        dispatch(updateStart())
        // Create the request
        const res = await fetch(`/api//user/update/${user._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
        const data = await res.json();
        console.log(data)
        if (!res.ok) {
          dispatch(updateFaliure(data.message))

        }
        else {
          dispatch(updateSucess(data))
          setUpdateUserSucess("user profile updated sucessfullly")
        }
        //  dispatch sucess or faliure
      } catch (error) {
        dispatch(updateFaliure(error))
      }
    }
    else {
      return
    }
  }
  async function handleDeleteUser(e) {
    setshowModel(false)
    try {
      dispatch(deleteUserStart())
    const res = await fetch(`/api/user/delete/${user._id}`,{
      method:"DELETE"
    })
    const data=await res.json();
    if(!res.ok){
      dispatch(deleteUserFaliure(data.message))
    }
    dispatch(deleteUserSucess(data))
    } catch (error) {
      dispatch(deleteUserFaliure(error))
    }
  }
  async function handlesignOut(e){
    try {
      const res=await fetch('/api/user/signout',{
        method:"POST"
      })
      const data=await res.json()
      console.log(res)
      console.log(data)
      if(res.ok){
        dispatch(signOutUserSucess())
      }
    } catch (error) {
      
    }
  }
  return (

    <div className='flex flex-col items-center w-full dark:bg-neutral-800 dark:text-white h-screen'>

      <h1 className='text-4xl mt-2'>Profile</h1>
      <input type="file" accept='image/*' onChange={handleImageChange} ref={imagePickerRef} hidden />
      <div className=' relative h-20 w-20 mt-2 rounded-full border-2' onClick={() => imagePickerRef.current.click()}>
        <img src={imageFileUrl || user.photo} alt="" className={`h-full w-full object-cover rounded-full ${imageUploadProgress && imageUploadProgress < 100 && 'opacity-10'}`} />
        {(imageUploadProgress && imageUploadProgress > 2) && (
          <CircularProgressbar value={imageUploadProgress} text={`${imageUploadProgress}%`}
            strokeWidth={5}
            className='absolute top-0'
          />
        )}
      </div>



      <div className='userinfo flex flex-col gap-2 mt-4'>
        <input type="text" id='username' className='rounded bg-transparent w-full' value={formData.username || user.username} onChange={handleInputChange} />
        <input type="email" id='email' className='rounded bg-transparent w-full' value={formData.email || user.email} onChange={handleInputChange} />
        <input type="password" id='password' className='rounded bg-transparent w-full' placeholder='Password' onChange={handleInputChange} />
        <button className='border w-full rounded-md py-2' onClick={handleSubmit}>Update</button>
      </div>
      <div className=' flex w-full justify-center gap-40 mt-6 text-red-700 font-bold'>

        <button onClick={(e) => setshowModel(true)}>DeleteAccount</button>
        <button onClick={handlesignOut}>signOut</button>
      </div>
      {user &&(
        <Link to='/create-post'>
        <button className='mt-4 border px-4 py-2 rounded-sm'>
          Create A post 
        </button>
        </Link>
      )}


      <Modal show={showModel} size="md" onClose={() => setshowModel(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this Account?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteUser}>
                {"Yes, I'm sure"}
              </Button>
              <Button color="gray" onClick={() => setshowModel(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>



      {updateuserSucess ? (
        alert ? null : <Alert color="success" onDismiss={() => setAlert(true)} className='mt-8'>
          <span className="font-medium">Info alert!</span> {updateuserSucess}
        </Alert>
      ) : null}


      {errormsg ? (
        alert ? null : <Alert color="failure" onDismiss={() => setAlert(true)} className='mt-8'>
          <span className="font-medium">Info alert!</span> {errormsg}
        </Alert>
      ) : null}
       {sliceError ? (
        alert ? null : <Alert color="failure" onDismiss={() => setAlert(true)} className='mt-8'>
          <span className="font-medium">Info alert!</span> {sliceError}
        </Alert>
      ) : null}
    </div>
  )
}


export default DashProfile