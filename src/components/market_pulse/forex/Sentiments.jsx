import React from 'react';
import { Typography } from '@mui/material';
import SentimentsBar from '../Common/SentimentsBar';
export default function Sentiments() {
  return (
    <>
      <Typography></Typography>
      <SentimentsBar
        currencyPair='EUR/USD'
        greenPercentage={66.55}
        value={33.1}
      />
      <Typography sx={{ color: '#bb914a', fontSize: '33px', fontWeight: 600 }}>
        Euro vs US Dollar-EURUSD
      </Typography>
    </>
  );
}
