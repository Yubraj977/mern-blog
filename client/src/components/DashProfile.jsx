
import React, { useEffect } from 'react'
import { useState } from 'react';
import {useSelector} from 'react-redux'
import { useRef } from 'react';
import {getDownloadURL, getStorage, uploadBytesResumable,ref} from 'firebase/storage'
import app from '../firebase';

function DashProfile() {
  const user=useSelector((state)=>state.user.currentUser)
  const [imageFile,setimageFile]=useState(null)
  const [imageFileUrl,setimageFileUrl]=useState(null)
  const imagePickerRef=useRef(null)
  const [imageUploadProgress,setimageUploadProgress]=useState(0)
  const [imageUploadError,setimageUploadError]=useState(null)

  console.log(imageUploadProgress,imageUploadError)
 
    function handleImageChange(e){
        const file=e.target.files[0]
        if(file){
            setimageFile(file);
            setimageFileUrl(URL.createObjectURL(file));
            // setfileName(  new Date().getTime()+file.name)
        }
    }
   
    useEffect(() => {
      if(imageFile){
        uploadImage()
      }
    }, [imageFile])
    
   const uploadImage=async ()=>{
    const storage=getStorage(app)
    const fileName=new Date().getTime()+imageFile.name;
    console.log(fileName);
        const storageRef=ref(storage,fileName)
        const uploadTask=uploadBytesResumable(storageRef,imageFile)
        uploadTask.on(
          'state_changed',
         (snapshot)=>{
          const progress=(snapshot.bytesTransferred/snapshot.totalBytes*100);
          setimageUploadProgress(progress.toFixed(0))
         },
         (error)=>{
          setimageUploadError(error)
         }
        ,
        ()=>{
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURl)=>{
            setimageFileUrl(downloadURl)
          })
        }
        )

   }
 


    function handleInputChange(){}
   
  return (
   
    <div className='flex flex-col items-center w-full dark:bg-neutral-800 dark:text-white h-screen'>

        <h1 className='text-4xl mt-2'>Profile</h1>
        <input type="file" accept='image/*' onChange={handleImageChange} ref={imagePickerRef} hidden/>
        <div className='h-20 w-20 mt-2 rounded-full border-2' onClick={()=>imagePickerRef.current.click()}>
        <img src={imageFileUrl || user.photo} alt="" className='h-full w-full object-cover rounded-full'/>
        </div>
        <div className='userinfo flex flex-col gap-2'>
        <input type="text" id='username' className='rounded bg-transparent w-full' value={user.username} onChange={handleInputChange}/>
        <input type="email" id='email' className='rounded bg-transparent w-full' value={user.email} onChange={handleInputChange}/>
        <input type="password" id='password' className='rounded bg-transparent w-full' placeholder='Password' onChange={handleInputChange}/>
        <button className='border w-full rounded-md py-2'>Update</button>
        </div>
        <div className=' flex w-full justify-center gap-40 mt-6 text-red-700 font-bold'>
        <button>DeleteAccount</button>
        <button>signOut</button>
        </div>
      

    </div>
  )
}

export default DashProfile