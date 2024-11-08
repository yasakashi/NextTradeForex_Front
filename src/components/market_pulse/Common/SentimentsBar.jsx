import React from 'react';
import { Box, Typography } from '@mui/material';

function index({ currencyPair, greenPercentage, value }) {
  const redPercentage = 100 - greenPercentage;

  return (
    <Box
      display='flex'
      alignItems='center'
      p={2}
      border={1}
      borderColor='grey.300'
      bgcolor='white'
      borderRadius={1}
      width='100%'
      zIndex={1}
    >
      <Typography variant='body1' fontWeight='bold' mr={2}>
        {currencyPair}
      </Typography>

      <Box display='flex' flexGrow={1} height={50} overflow='hidden'>
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          bgcolor='success.main'
          color='white'
          width={`${greenPercentage}%`}
          position='relative'
        >
          <Typography variant='body2' fontWeight='bold'>
            {`${greenPercentage.toFixed(2)}%`}
          </Typography>

          {value && (
            <Box
              position='absolute'
              right={8}
              bgcolor='success.light'
              p={0.5}
              px={1}
              borderRadius={4}
              color='success.dark'
              fontWeight='bold'
              fontSize='12px'
            >
              {`+${value.toFixed(2)}%`}
            </Box>
          )}
        </Box>

        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          bgcolor='error.main'
          color='white'
          width={`${redPercentage}%`}
        >
          <Typography variant='body2' fontWeight='bold'>
            {`${redPercentage.toFixed(2)}%`}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default index;
