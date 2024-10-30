import React from 'react';

export default function TextBox({ title, description }) {
  return (
    <div className='flex flex-col space-y-2'>
      <h3 className='text-gold-light_400'>{title}</h3>
      <p className='text-link-water'>{description}</p>
    </div>
  );
}
