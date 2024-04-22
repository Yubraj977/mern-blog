import React, { useEffect } from 'react'
import app from '../firebase';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { getDownloadURL, getStorage, uploadBytesResumable, ref } from 'firebase/storage'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useState } from 'react';
import { TextInput, Select, FileInput, Button } from 'flowbite-react'
import { Alert } from 'flowbite-react';
import {useNavigate} from 'react-router-dom'
import {useParams } from 'react-router-dom'





function UpdatePost() {
const {postId}=useParams()
console.log(postId)
const navigate=useNavigate();
const [imageFile, setimageFile] = useState(null)
const [imageUrl, setImageUrl] = useState(null)//To be send in backend
const [imageUploadProgress, setimageUploadProgress] = useState(null)
const [imageUploadError, setimageUploadError] = useState(null)
const [formData,setformData]=useState({})// To be send in backend
console.log(formData)
const [universalError,setuniversalError]=useState(null)
const [value, setValue] = useState('');
useEffect(() => {
  const fetchData = async () => {
      try {
          const res = await fetch(`/api/post/getposts/?postId=${postId}`);
          const data = await res.json();
          console.log(data);
          if(!res.ok){
            console.log(data.message)
          }
          setformData(data.posts[0])
      } catch (error) {
          console.error('Error fetching data:', error);
          console.log(error.message)
      }
  };

  fetchData();
}, [postId]);


useEffect(() => {
  if(imageFile){
    uploadImage()
  }
}, [imageFile])
async function uploadImage() {
 
  const fileName = new Date().getTime() + imageFile.name;
  const storage = getStorage(app)
  const storageRef = ref(storage, fileName)
  const uploadTask = uploadBytesResumable(storageRef, imageFile)
  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes * 100)
      setimageUploadProgress(progress.toFixed(0))
    },
    (error) => {
      setimageUploadError(error)
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setImageUrl(downloadUrl)
        setformData({...formData,image:downloadUrl})
      

      })
    }
  )
}
async function handleUpdate(e){
  e.preventDefault();
  console.log(`clicked`)
 const res=await fetch(`/api/post/update/${postId}`,{
  method:"PUT",
  headers:{
    'Content-Type':'application/json'
  },
  body:JSON.stringify(formData)
 })
 const data=await res.json()
 console.log(data)
 if(res.ok){
  navigate(`/post/${data.slug}`)
 }



}





  return (
    <div className='bg-white text-black dark:bg-neutral-800 dark:text-white flex flex-col items-center w-full  lg:px-72 min-h-screen p-2'>
    <h1 className='text-5xl '>Update a post </h1>
    <div className='lg:flex   w-full lg:gap-10 gap-4 mt-10 flex flex-col lg:flex-row'>
      <TextInput type="text" placeholder='Title' id='title' required className='w-full' onChange={(e)=>setformData({...formData,title:e.target.value})} value={formData.title}/>
      <Select className='w-auto' onChange={(e)=>setformData({...formData,category:e.target.value})} value={formData.category}>
        <option value='uncateogarized'>Select A Category</option>
        <option value='Coding'>Coding</option>
        <option value='Life'>Life</option>
        <option value='fun'>fun</option>
        <option value='movies'>Movies</option>
      </Select>
    </div>
    <div className='flex border-dotted gap-8 border w-full mt-8 p-4'>
      <FileInput type='file' accept='image/*' onChange={(e) => setimageFile(e.target.files[0])} />
    {imageUrl&& <p className='mt-3'>Image is uploaded</p>}
    {imageUploadError&&<Alert color='failure'> Error ! Upload is Failed </Alert>}
      

    </div>
    {formData.image&&(
       <div className='w-full h-96'>
       <img src={formData.image} alt="" className='h-full w-full object-cover'/>
     </div>
    )}
    {/* {imageUrl&&(
        <div className='w-full h-96'>
        <img src={imageUrl} alt="" className='h-full w-full object-cover'/>
      </div>
    )}
   */}
    <ReactQuill theme="snow"   className='w-full h-72 mb-4' required onChange={(value)=>{
      setformData({...formData,content:value})
    }} value={formData.content}/>
    <Button type='button' outline className='w-full mt-10 px-' onClick={handleUpdate}>
      Update
    </Button>
    {universalError&&(
        <Alert color='failure' className='mt-4'>Error! {universalError}</Alert>
    )}
  
  </div>
  )
}

export default UpdatePost