import React from 'react'
import NavBar from '../Navigation/NavBar'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className=" flex">
        <NavBar/>
        <Outlet/>
    </div>
  )
}

export default MainLayout