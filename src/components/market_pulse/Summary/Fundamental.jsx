import React from 'react';
import CommonDashboardTable from './Container';

export default function FundamentalSammary({ heading }) {
  return (
    <div>
      <h3 className="text-link-water text-3xl font-extrabold mb-5">
        {heading}
      </h3>
      <CommonDashboardTable />
    </div>
  );
}
