import React, { useState } from 'react';

const CommonDashboardTable = () => {
  const [activeTab, setActiveTab] = useState('Summary');
  const [selectedTimeframe, setSelectedTimeframe] = useState('Monthly');

  const tabs = [
    'Summary',
    'Range',
    'Events',
    'Breaking News',
    'Expert Estimates',
    'TradeSetup',
  ];
  const timeframes = [
    'Minute5',
    'Minute15',
    'Minute30',
    'Hour1',
    'Hour4',
    'Daily',
    'Weekly',
    'Monthly',
  ];

  return (
    <div className='bg-blue-dark border-[1px] border-gold-light_400 text-white p-4'>
      <div className='flex space-x-4 mb-6'>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`text-sm font-bold py-2 px-4 ${
              activeTab === tab
                ? 'bg-gold-light_400 rounded-t-lg'
                : 'border-b border-gold-light_400'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className='flex gap-3'>
        <div className='flex flex-col space-y-2 bg-blue-light p-4 '>
          {timeframes.map((timeframe) => (
            <button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`text-white text-sm ${
                selectedTimeframe === timeframe
                  ? 'bg-gold-light_400 px-2 py-1 rounded'
                  : ''
              }`}
            >
              {timeframe}
            </button>
          ))}
        </div>

        <div className='flex-1 grid grid-cols-3 gap-4 bg-blue-light p-4 rounded-r-lg'>
          {activeTab === 'Summary' && (
            <>
              <div className='bg-blue-dark rounded-lg p-6 text-center border-t-2 border-gold-light_400'>
                <p className='text-gold-bg-gold-light_400 text-xl font-bold'>
                  EURUSD
                </p>
                <p className='text-3xl font-bold text-white'>
                  1.08807 <span className='text-green-500'>▲</span>
                </p>
              </div>
              <div className='bg-blue-dark rounded-lg p-6 text-center border-t-2 border-gold-light_400'>
                <img
                  src='bull-icon.svg'
                  alt='Bull'
                  className='mx-auto h-12 w-12 mb-4'
                />{' '}
                <p className='text-gold-bg-gold-light_400 text-xl font-bold'>
                  LONG
                </p>
              </div>

              <div className='bg-blue-dark rounded-lg p-6 text-center border-t-2 border-gold-light_400'>
                <img
                  src='strength-icon.svg'
                  alt='Strength'
                  className='mx-auto h-12 w-12 mb-4'
                />{' '}
                <p className='text-gold-bg-gold-light_400 text-xl font-bold'>
                  STRENGTH
                </p>
              </div>
            </>
          )}

          {activeTab !== 'Summary' && (
            <div className='col-span-3 bg-blue-dark rounded-lg p-6 text-center border-t-2 border-gold-light_400'>
              <p className='text-xl font-bold text-gold-bg-gold-light_400'>
                {activeTab} Content
              </p>
              <p className='text-white mt-2'>
                This is the content for the {activeTab} tab.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommonDashboardTable;
