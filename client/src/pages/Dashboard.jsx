import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import Dashpost from '../components/Dashpost';



function Dashboard() {
  const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(() => {
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab')
    setTab(tabFromUrl)
    
  }, [location.search])
  
  return (
    <div className='lg:flex dark:bg-[rgba(31,41,55,255)]'>
    <DashSidebar/>
    {tab=='profile'&&<DashProfile/>}
    {tab=='posts'&&<Dashpost/>}
    </div>
  )
}

export default Dashboard