import React from 'react';

const ListedExchange = () => {
  const data = [
    {
      label: 'Bombay Stock Exchange',
      value: '',
    },
  ];

  return (
    <div className="bg-blue-light  text-white p-6 rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <tbody>
          {data.map((row, index) => (
            <tr
              key={index}
              className={`border-t border-gray-700 ${
                index === 0 ? 'border-t-0' : ''
              }`}
            >
              <td className="py-2 font-extralight text-sm">{row.label}</td>
              <td className="py-2 text-right  text-sm font-extralight">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListedExchange;
