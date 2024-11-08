import React from 'react';
import { Typography } from '@mui/material';
import SentimentsBar from '../Common/SentimentsBar';
export default function Sentiments({ title, data }) {
  return (
    <>
      <p className="text-link-water self-start text-4xl font-bold" variant="h4">
        {title}
      </p>
      <div dangerouslySetInnerHTML={{ __html: data }} />
    </>
  );
}
