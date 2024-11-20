import React from 'react';

const InfoTable = ({data1}) => {
  const data = [
    { label: 'Countries Represented', value: 'India' },
    { label: 'Central Bank', value: 'Reserve Bank of India' },
    { label: 'Nickname', value: 'BSE' },
    {
      label: 'Related Constituents',
      value: (
        <a href="#" className="text-blue-400 underline">
          View
        </a>
      ),
    },
    { label: 'Weightage of Largest Constituent', value: 'HDFC Bank 15.29%' },
    { label: 'Weightage of Top 5 Constituents', value: '—' },
    { label: 'All time High', value: '68988.00' },
    { label: 'All time Low', value: '2511.05' },
    { label: 'Market Capitalization', value: '$3.8 Trillion' },
    {
      label: 'Weighting Methodology',
      value: 'Free-float market capitalisation',
    },
    { label: 'Year to Date Return', value: '—' },
    { label: 'Dividend Yield', value: '1.42' },
    { label: 'Price to earning Ratio', value: '24.59' },
  ];

  return (
    <div className="bg-indigo-900 text-white max-w-md mx-auto mt-10 p-6 rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t border-gray-700 ${
                index === 0 ? 'border-t-0' : ''
              }`}
            >
              <td className="py-2 font-medium">{row.label}</td>
              <td className="py-2 text-right">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InfoTable;
