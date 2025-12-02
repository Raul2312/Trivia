import { useState } from 'react'
import Sidebar from './../layouts/Sidebar'
import Header from './../layouts/Header'
import Card from './../components/Card'
import CreditCard from './../components/CreditCard'
import { Outlet } from 'react-router-dom'
import "../index.css";



function Dashboard() {
  return (
    <>

      <div className="d-flex">

        <Sidebar />

        <div className="content-area flex-grow-1">
          <Header />
          <Outlet />

        </div>
      </div>


    </>
  )
}

export default Dashboard 
