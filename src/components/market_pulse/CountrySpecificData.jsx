import { useEffect, useState } from 'react';
import CustomTextField from '../../common/custom_text_field';

function CountrySpecificData({ countryData, onCountryDataChange }) {
  const [data, setData] = useState(countryData || []);

  const [countries, setCountrName] = useState('');
  const [centralbank, setCentralBank] = useState('');
  const [nickname, setNickName] = useState('');
  const [avragedaily, setDailyAvg] = useState('');

  const addRow = () => {
    if (countries && centralbank && nickname && avragedaily) {
      setData([...data, { countries, centralbank, nickname, avragedaily }]);
      // Reset input fields after adding a row
      setCountrName('');
      setCentralBank('');
      setNickName('');
      setDailyAvg('');
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  useEffect(() => {
    console.log(data);

    onCountryDataChange(data);
  }, [data, onCountryDataChange]);

  return (
    <div>
      <div className="grid grid-cols-4 gap-2">
        <CustomTextField
          value={countries}
          onChange={(e) => setCountrName(e.target.value)}
          helper_text="COUNTRY"
          helper_text_up_position
          placeHolder="Course Title"
        />
        <CustomTextField
          value={centralbank}
          onChange={(e) => setCentralBank(e.target.value)}
          helper_text="CENTRAL BANK"
          helper_text_up_position
          placeHolder="Course Title"
        />
        <CustomTextField
          value={nickname}
          onChange={(e) => setNickName(e.target.value)}
          helper_text="NICKNAME"
          helper_text_up_position
          placeHolder="Course Title"
        />
        <CustomTextField
          value={avragedaily}
          onChange={(e) => setDailyAvg(e.target.value)}
          helper_text="% OF AVERAGE DAILY TURNOVER"
          helper_text_up_position
          placeHolder="Course Title"
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
            <span>
              {item.countries} - {item.centralbank} - {item.nickname} -{' '}
              {item.avragedaily}
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

export default CountrySpecificData;
