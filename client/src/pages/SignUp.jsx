import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Alert } from 'flowbite-react';
import { HiInformationCircle } from 'react-icons/hi';
import { Spinner } from 'flowbite-react';
import Oath from '../components/Oath';


function SignUp() {
  const navigate = useNavigate()
  const [ferror, setferror] = useState(null)
  const [loading,setloading]=useState(false)
  const [form, setform] = useState({})


  function handleChange(e) {
    setform({ ...form, [e.target.id]: e.target.value });
    console.log(form);
  }



  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.username || !form.email || !form.password || form.username == ' ' || form.email == " " || form.password == '') {
      return setferror('Please all Fields are required')
    }

    console.log('clicked')
   
    try {
      setloading(true)
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      }).then((response) => response.json()).then((data) => {
       
       if(data.sucess===false){
    
        setferror(data.message)
       }
       
      
        console.log(data);
        setloading(false)
        if(data.sucess===true){
          navigate('/signin')
        }

      })
        .catch((res) => { 
          console.log(res);
          setloading(false)
         })



    } catch (error) {
      setferr
    }

  }
  return (
    <div className=' border border-red-950 mx-auto my-auto w-full min-h-screen flex flex-col justify-center items-center dark:bg-gray-900'>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">


          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
            <img src="https://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3Dhttps://images.unsplash.com/photo-1563694983011-6f4d90358083?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="mr-3 h-6 sm:h-9" alt="Blog Logo" />
            BlogSite
          </a>


          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white" >
                Create and account
              </h1>



              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">username</label>
                  <input type="text" id='username' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="blog wla admi" required="" />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                  <input type="email" id='email' onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                  <input type="text" id='password' placeholder="••••••••" onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="" />
                </div>

                <div className="flex items-start">

                </div>

                <button className='border w-full py-2 px-4 rounded-lg  text-gray-900 dark:text-white' type='submit' onClick={handleSubmit} disabled={loading}>
                  {loading? ( <span> <Spinner color="info" aria-label="Info spinner example" />  loading ...</span>):<p>Create accout</p>}
                  </button>
                  <Oath/>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account? <span href="#" className="font-medium text-primary-600 hover:underline dark:text-primary-500" onClick={() => { navigate('/signin') }}>Login here</span>
                </p>
                {ferror && (
                 <Alert color="failure" icon={HiInformationCircle}>
                 {ferror}
               </Alert>
              )}


              </form>

            







            </div>
          </div>
        </div>
      </section>
    </div>

  )
}

export default SignUp