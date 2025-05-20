import React from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { Outlet } from 'react-router';

const MainLayout = () => {
    return (
        <div className='md:max-w-6xl mx-auto'>
        <Navbar></Navbar>
        <div>
            <Outlet></Outlet>
        </div>
        <Footer></Footer>
        </div>
    );
};

export default MainLayout;