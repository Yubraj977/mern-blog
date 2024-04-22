import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function CreatePostCover() {
    const currentUser = useSelector((state) => state.user.currentUser)

  return currentUser&&currentUser.isAdmin?<Outlet/>:<Navigate to='signin'/>
}

export default CreatePostCover