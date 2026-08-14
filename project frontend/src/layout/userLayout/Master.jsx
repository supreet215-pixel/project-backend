import React from 'react'
import UserHeader from './UserHeader'
import { Outlet } from 'react-router-dom'

const UserMaster = () => {
  return (
    <>
        <UserHeader/>
        <Outlet/>
    
    </>
  )
}

export default UserMaster