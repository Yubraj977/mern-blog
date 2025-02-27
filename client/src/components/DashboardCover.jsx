import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function DashboardCover() {
    const currentUser = useSelector((state) => state.user.currentUser)
    
    return (
       currentUser?<Outlet/>:<Navigate to='signin'/>
    )
}

export default DashboardCover