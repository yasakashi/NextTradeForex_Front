import React from 'react';
import Sentiments from './forex/Sentiments';
import TextBox from './forex/TextBox';

const textBoxes = [
  { title: 'Countries', description: 'Eurozone/United States' },
  { title: '2022 HIGHS & LOWS', description: '1.15123/0.95542' },
  { title: 'PAIRS THAT CORRELATE', description: 'EUR/CAD, EUR/AUD, NZD/USD' },
  { title: 'PAIR TYPE', description: 'Major' },
];
export default function Story() {
  return (
    <div className='w-4/5 flex flex-col mx-auto mt-[10rem] gap-2'>
      <p className='text-link-water self-start text-4xl font-bold' variant='h4'>
        Market Sentiments
      </p>
      <Sentiments />
      <div className='grid grid-cols-2 gap-4'>
        {textBoxes.map((el) => (
          <React.Fragment key={el.title}>
            <TextBox title={el.title} description={el.description} />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}
