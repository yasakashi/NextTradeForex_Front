import { useEffect, useState } from 'react';
import CustomTextField from '../../common/custom_text_field';

function CountryGeneralData({ flexibleBlocklist, onCountryDataChange }) {
  const [data, setData] = useState(flexibleBlocklist || []);

  const [countries, setCountrName] = useState('');
  const [pairsthatcorrelate, setPairsthatcorrelate] = useState('');
  const [highslows, setHighslows] = useState('');
  const [pairtype, setPairtype] = useState('');
  const [dailyavrage, setDailyavrage] = useState('');
  const [mainTitle, setMainTitle] = useState('');

  const addRow = () => {
    if (
      countries &&
      pairsthatcorrelate &&
      highslows &&
      pairtype &&
      dailyavrage &&
      mainTitle
    ) {
      setData([
        ...data,
        {
          countries,
          pairsthatcorrelate,
          highslows,
          pairtype,
          dailyavrage,
          mainTitle,
        },
      ]);
      // Reset input fields after adding a row
      setCountrName('');
      setHighslows('');
      setPairsthatcorrelate('');
      setPairtype('');
      setDailyavrage('');
      setMainTitle('');
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  useEffect(() => {
    onCountryDataChange(data);
  }, [data, onCountryDataChange]);

  return (
    <div>
      <CustomTextField
        value={mainTitle}
        onChange={(e) => setMainTitle(e.target.value)}
        helper_text="Main title"
        helper_text_up_position
      />
      <div className="grid grid-cols-4 gap-3 mt-[10px]">
        <CustomTextField
          value={countries}
          onChange={(e) => setCountrName(e.target.value)}
          helper_text="COUNTRIES"
          helper_text_up_position
        />
        <CustomTextField
          value={pairsthatcorrelate}
          onChange={(e) => setPairsthatcorrelate(e.target.value)}
          helper_text="PAIRS THAT CORRELATE:"
          helper_text_up_position
        />
        <CustomTextField
          value={highslows}
          onChange={(e) => setHighslows(e.target.value)}
          helper_text="2022 HIGHS & LOWS"
          helper_text_up_position
        />
        <CustomTextField
          value={pairtype}
          onChange={(e)=>setPairtype(e.target.value)}
          helper_text="	PAIR TYPE:"
          helper_text_up_position
        />
        <CustomTextField
          value={dailyavrage}
          onChange={(e) => setDailyavrage(e.target.value)}
          helper_text="DAILY AVERAGE MOVEMENT IN PIPS"
          helper_text_up_position
        />
      </div>

      <button
        className="mt-[5px] text-sm bg-blue-700 rounded-sm text-white px-[12px] py-[7px]"
        onClick={addRow}
      >
        Add row
      </button>

      <div className="mt-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex items-center justify-between border-b py-2"
          >
            {item.mainTitle}
            <span>
              {item.countries} - {item.pairsthatcorrelate} - {item.highslows} -{' '}
              {item.pairtype} - {item.dailyavrage}
            </span>
            <button
              className="text-red-500 ml-4"
              onClick={() => removeRow(index)}
            >
              X
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CountryGeneralData;
