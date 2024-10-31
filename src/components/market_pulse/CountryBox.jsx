import React from 'react';
import LittleTextBox from './forex/LittleTextBox';

export default function CountryBox({ title, data }) {
  return (
    <div className='flex flex-col gap-10'>
      <h4 className='text-gold-light_400 text-2xl font-bold'>{title}</h4>
      
        {data.map((el) => (
          <React.Fragment key={el.title}>
            <LittleTextBox title={el.title} description={el.description} />
          </React.Fragment>
        ))}
      
    </div>
  );
}
