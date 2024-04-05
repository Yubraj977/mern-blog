import React from 'react'
import { Button } from 'flowbite-react'
import { FaGoogle } from "react-icons/fa";
import {GoogleAuthProvider,signInWithPopup,getAuth } from 'firebase/auth'
import app from '../firebase';
import {useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {  signInSucess } from '../app/slice/userSlice'

function Oath() {
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const auth=getAuth(app)
     async function  handleOath(){
        const Provider=new GoogleAuthProvider()
        Provider.setCustomParameters({prompt:'select_account'})
        try {
            const resultFromGoogle=await signInWithPopup(auth,Provider)
            const name=await resultFromGoogle.user.displayName
            const email=await resultFromGoogle.user.email
            const photo=await resultFromGoogle.user.photoURL
               
            const res= await fetch('api/auth/google',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({name,email,photo})
            })
            if (res.ok) {
                const data = await res.json(); // Parse response body as JSON
                console.log(data); // Log the data received from the server
                dispatch(signInSucess(data))
                navigate('/')
            } else {
                console.error('Failed to fetch'); // Log an error if the request was not successful
            }


        } catch (error) {
            console.log(error);
            
        }
    }



  return (
    <button className=' border relative w-full rounded-lg py-2 dark:text-white font-bold  '  onClick={handleOath}> <FaGoogle className=' absolute top-1/2 -translate-y-1/2 left-8'/>  Continue With Google</button>
  )
}

export default Oath