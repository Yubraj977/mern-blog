import React, { useEffect, useState } from 'react'
import {useLocation} from 'react-router-dom'
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
function Dashboard() {
  const location=useLocation()
  const [tab,setTab]=useState('')
  useEffect(() => {
    const urlParams=new URLSearchParams(location.search);
    const tabFromUrl=urlParams.get('tab')
    setTab(tabFromUrl)
    
  }, [location.search])
  
  return (
    <div className='lg:flex'>
    <DashSidebar/>
    {tab=='profile'&&<DashProfile/>}
    </div>
  )
}

export default Dashboard