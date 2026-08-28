import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './navbar/Navbar';
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Footer from './footer/Footer';

const Layout = (props) => {
    const {Logout,CartItems,Loading,User,url,db}=props
    return (
        <div className='flex flex-col h-full'>
            <Navbar Logout={Logout} CartItems={CartItems} User={User} url={url} db={db} />
            {Loading?
            <div className='flex justify-center items-center relative top-48'><ClimbingBoxLoader loading={Loading} size={15} /></div>:
            <>
            <Outlet />
            <div>
                <Footer />
            </div>
            </>}
        </div>
    );
}

export default Layout;
