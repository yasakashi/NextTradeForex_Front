import React from 'react';
import { Typography } from '@mui/material';
import SentimentsBar from '../Common/SentimentsBar';
export default function Sentiments() {
  return (
    <>
      <p className='text-link-water self-start text-4xl font-bold' variant='h4'>
        Market Sentiments
      </p>

      <SentimentsBar
        currencyPair='EUR/USD'
        greenPercentage={66.55}
        value={33.1}
      />
    </>
  );
}
