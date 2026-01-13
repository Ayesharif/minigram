import React from 'react'
import NavBar from '../component/NavBar'
import { Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className='h-full'>
      <NavBar/>
      <Outlet/>

    </div>
  )
}
