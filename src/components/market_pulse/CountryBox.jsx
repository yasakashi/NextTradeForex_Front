import React from 'react';
import LittleTextBox from './forex/LittleTextBox';

export default function CountryBox({ title, data }) {
  return (
    <div className="flex flex-col gap-10">
      <h4 className="text-gold-light_400 text-2xl font-bold">{title}</h4>

      {data &&
        Object?.entries(data)
          ?.filter((el) => {
            return el[0] !== 'marketpulsforexid' && el[0] !== 'id';
          })
          ?.map((el) => (
            <React.Fragment key={el[0]}>
              <LittleTextBox title={el[0]} description={el[1]} />
            </React.Fragment>
          ))}
    </div>
  );
}
