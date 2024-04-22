import React from 'react'
import { useState, useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import { Link, useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { signOutUserSucess } from '../app/slice/userSlice.js'
import { useSelector } from 'react-redux'

function DashSidebar() {
  const dispatch = useDispatch()
  const location = useLocation()
  const [tab, setTab] = useState('')
  const user = useSelector((state) => state.user.currentUser)
  console.log(user)
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab')
    setTab(tabFromUrl)

  }, [location.search])
  async function handlesignOut(e) {
    console.log(`i am clicked`)
    try {
      const res = await fetch('/api/user/signout', {
        method: "POST"
      })
      const data = await res.json()
      console.log(res)
      console.log(data)
      if (res.ok) {
        dispatch(signOutUserSucess())
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (

    <Sidebar aria-label="Default sidebar example " className='w-full lg:w-64 '>
      <Sidebar.Items className='h-full' as="div">
        <Sidebar.ItemGroup className='flex  flex-col' as="div">



          <Link to='/dashboard?tab=profile'>
            <Sidebar.Item active={tab == 'profile'} href="#" icon='' label="user" labelColor="dark" as="div">
              Profile
            </Sidebar.Item>
          </Link>

          {user.isAdmin && (

            <Link to='/dashboard?tab=posts'>
              <Sidebar.Item active={tab == 'posts'} href="#" icon='' as="div">
                Posts
              </Sidebar.Item>
            </Link>
          )}

          <Sidebar.Item href="#" icon='' as="div" onClick={handlesignOut}>
            <span onClick={handlesignOut}> Sign Out</span>
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>

  )
}

export default DashSidebar