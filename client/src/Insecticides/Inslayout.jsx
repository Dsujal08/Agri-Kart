import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import CartTab from './InscartTab';
import { useCart } from '../Seeds/Cart';

const Layout = () => {
    const { statusTab } = useCart();

    return (
        <div className='bg-zinc-200 min-h-screen flex'>
            <main 
                className={`w-full max-w-6xl m-auto p-5 transition-all duration-500
                ${statusTab ? "mr-96" : ""}`} // Adjust margin when cart is open
            >
                <Header />
                <Outlet />
            </main>
            <CartTab />
        </div>
    );
};

export default Layout;
