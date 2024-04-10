import React from 'react'
import { useState,useEffect } from 'react';
import { Sidebar } from "flowbite-react";
import {Link, useLocation} from 'react-router-dom'


function DashSidebar() {
    const location=useLocation()
    const [tab,setTab]=useState('')
    useEffect(() => {
      const urlParams=new URLSearchParams(location.search);
      const tabFromUrl=urlParams.get('tab')
      setTab(tabFromUrl)
      
    }, [location.search])

  return (
   
    <Sidebar aria-label="Default sidebar example " className='w-full lg:w-64'>
    <Sidebar.Items className='lg:min-h-screen  ' as="div">
      <Sidebar.ItemGroup className='flex  flex-col' as="div">
        <Link to='/dashboard?tab=profile'>
        <Sidebar.Item active={tab=='profile'} href="#" icon='' label="user" labelColor="dark" as="div">
          Profile
        </Sidebar.Item>
        </Link>
        
       
       
        <Sidebar.Item href="#" icon='' as="div">
          Sign Out
        </Sidebar.Item>
      </Sidebar.ItemGroup>
    </Sidebar.Items>
  </Sidebar>
  
  )
}

export default DashSidebar