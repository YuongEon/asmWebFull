import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

const WebLayout = ({role} : any) => {
  return (
    <div>
      <Header role={role}/>
      <main className='min-h-screen py-5 container mx-auto'>
        <Outlet/>
      </main>
      <Footer/>
    </div>
  )
}

export default WebLayout