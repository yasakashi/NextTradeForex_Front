import React from 'react';
import Sentiments from './forex/Sentiments';
import TextBox from './forex/TextBox';
import ReadMoreContent from './ScrollBox';

const textBoxes = [
  { title: 'Countries', description: 'Eurozone/United States' },
  { title: '2022 HIGHS & LOWS', description: '1.15123/0.95542' },
  { title: 'PAIRS THAT CORRELATE', description: 'EUR/CAD, EUR/AUD, NZD/USD' },
  { title: 'PAIR TYPE', description: 'Major' },
  { title: 'DAILY AVERAGE MOVEMENT IN PIPS', description: '107.4' },
];
export default function Story() {
  return (
    <div className='w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8'>
      <Sentiments />
      <div className='flex gap-10'>
        <div className='w-2/3 flex flex-col  gap-y-8'>
          <p className='text-gold-light_400 text-5xl font-bold'>
            Euro vs US Dollar-EURUSD
          </p>
          <div className='grid grid-cols-2 gap-4'>
            {textBoxes.map((el) => (
              <React.Fragment key={el.title}>
                <TextBox title={el.title} description={el.description} />
              </React.Fragment>
            ))}
          </div>
          <TextBox
            title={'ONE-YEAR CHART'}
            description={'EUR/USD Chart'}
          ></TextBox>
          <div>
            <img src='dist/assets/chart.png' alt='chart' />
          </div>
        </div>
        <div className='w-1/3 min-h-screen bg-primary'></div>
      </div>

      <ReadMoreContent/>
    </div>
  );
}
