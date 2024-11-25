import React from 'react';

const InfoTable = ({ data }) => {
  const dataa = [
    {
      label: 'Countries Represented',
      value: data.indicesinformations_countriesrepresented,
    },
    { label: 'Central Bank', value: data.indicesinformations_centralbank },
    { label: 'Nickname', value: data.indicesinformations_nickname },

    {
      label: 'Related Constituents',
      value: data.indicesinformations_relatedconstituents,
    },
    {
      label: 'Weightage of Largest Constituent',
      value: data.indicesinformations_weightageoflargestconstituent,
    },
    {
      label: 'Weightage of Top 5 Constituents',
      value: data.indicesinformations_weightageoftop5constituents,
    },
    { label: 'All time High', value: data.indicesinformations_alltimehigh },
    { label: 'All time Low', value: data.indicesinformations_alltimelow },
    {
      label: 'Market Capitalization',
      value: data.indicesinformations_warketcapitalization,
    },
    {
      label: 'Weighting Methodology',
      value: data.indicesinformations_weightingmethodology,
    },

    {
      label: 'Year to Date Return',
      value: data.indicesinformations_yeartodatereturn,
    },
    {
      label: 'Dividend Yield',
      value: data.indicesinformations_pricetoearningratio,
    },
    {
      label: 'Price to earning Ratio',
      value: data.indicesinformations_pricetoearningratio,
    },
  ];

  return (
    <div className="bg-blue-light  text-white p-6 rounded-lg shadow-lg">
      <table className="w-full text-left border-collapse">
        <tbody>
          {dataa.map((row, index) => (
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

export default InfoTable;
