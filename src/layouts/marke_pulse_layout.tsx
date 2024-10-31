import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Category from '../components/market_pulse/category';
import Story from '../components/market_pulse/Story';

const MarketPulseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex flex-col justify-center min-h-svh bg-blue-dark'>
      <Navbar />

      <div className='relative flex items-center justify-center z-[1] bg-blue-light mb-[300px] max-lg:mb-[150px] max-[720px]:py-[40px] max-[720px]:rounded-br-[50px] max-[720px]:rounded-bl-[50px]'>
        <div className='text-center relative z-[2]'>
          <h1 className='font-bold text-white text-4xl mb-[20px]'>
            Market Pulse
          </h1>
          <p className='text-[12px] font-light text-gray-500'>
            <Link to='/'>
              <span className='text-gold-light_400 mr-[10px]'>Home</span>
            </Link>
            / Market Pulse
          </p>
        </div>
        
        <svg
          className='max-[720px]:hidden select-none absolute left-0 top-[30px]'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 1440 320'
        >
          <path
            fill='#09165a'
            fillOpacity='1'
            d='M0,96L120,128C240,160,480,224,720,218.7C960,213,1200,139,1320,101.3L1440,64L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z'
          ></path>
        </svg>
      </div>

      <Category />

      <img
        className='w-1/4 absolute scale-x-[-1] left-3/4 top-[18%] !z-0 opacity-70 pointer-events-none select-none'
        src='/assets/bgicon2.png'
        alt='Icon'
      />
      <Outlet />
      <Story />

      <div className='mt-auto'>
        <Footer />
      </div>
    </div>
  );
};

export default MarketPulseLayout;
