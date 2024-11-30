import React from 'react';

export default function TextBox({ title, description }) {
  return (
    <div className='flex flex-col '>
      <h3 className='text-gold-light_400 text-2xl font-bold'>{title.toUpperCase() + ':'}</h3>
      <p className='text-link-water '>{description}</p>
    </div>
  );
}
