import React from 'react';

export default function CarouselCard({ label }) {
  return (
    <div className='w-[350px] mx-4 bg-gray-light_100 text-white rounded-xl '>
      <div className='bg-gray-100 rounded-t-xl overflow-hidden'>
        <div className='relative'>
          <img
            src='dist/assets/img1.jpg'
            alt='EUR/USD Chart'
            className='w-full h-48 object-cover'
          />
          <div className='absolute top-3 right-0 bg-white text-gold-light_400 border border-gold-light_400 rounded-e-xl font-semibold px-3 py-1 rounded-full'>
            {label}
          </div>
        </div>
      </div>
      <div className='px-4 py-4'>
        <h2 className='text-xl font-bold text-gold-light_400'>EURUSD</h2>
      </div>
    </div>
  );
}
