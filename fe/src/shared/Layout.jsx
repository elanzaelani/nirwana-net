import React from "react";
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMe } from '../features/authSlice';

function Layout ({children}){
  
  return (
    // <div>
    //   <div><Header/></div>
    //   <div><Sidebar/></div>
    //   <Outlet/>
    //   <div><Footer/></div>
    // </div>

    <React.Fragment>
    <Header/>
      <Sidebar/>
      
        <main>{children}</main>
    <Footer/>
     
    </React.Fragment>
  )
}

export default Layout

