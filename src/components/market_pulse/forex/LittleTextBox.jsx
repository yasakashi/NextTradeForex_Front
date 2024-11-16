import React from 'react';

export default function LittleTextBox({ title, description }) {
  return (
    <div className='flex flex-col '>
      <h3 className='text-link-water text-lg font-bold'>{title.toUpperCase() + ':'}</h3>
      <p className='text-gray-light '>{description}</p>
    </div>
  );
}
