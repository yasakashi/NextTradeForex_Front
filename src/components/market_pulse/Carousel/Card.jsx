import React from 'react';

export default function CarouselCard({ label }) {
  return (
    <div className='w-[300px]  bg-gray-light_100 text-white rounded-xl '>
      <div className=' rounded-t-xl overflow-hidden'>
        <div className='relative p-3'>
          <img
            src='dist/assets/img1.jpg'
            alt='EUR/USD Chart'
            className='w-full h-48 object-cover rounded-lg'
          />
          <div className='absolute top-6 right-3 bg-white text-gold-light_400 border border-gold-light_400 rounded-e-xl font-semibold px-3 py-1 rounded-full'>
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