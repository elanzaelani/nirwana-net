import React from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({children}) => {
    return (
        <React.Fragment>
            {/* <Navbar/>
            <div className="columns mt-6" style={{minHeight:"100vh"}}>
                <div className="column is-2">
                    <Sidebar/>
                </div>
                <div className="column has-background-light">
                    <main>{children}</main>
                </div>
            </div> */}
            <Header/>
            <Sidebar/>
            <main>{children}</main>
            <Footer/>
        </React.Fragment>
    )
}

export default Layout
