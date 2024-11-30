import { useEffect, useState } from 'react';
import CustomTextField from '../../../../../common/custom_text_field';
import Expandable from '../../../../../components/Expandable';

function IndicesInformation({ infoData }) {
  const [data, setData] = useState(infoData || []);

  const [information, setInformation] = useState({
    indicesinformations_countriesrepresented: '',
    indicesinformations_centralbank: '',
    indicesinformations_nickname: '',
    indicesinformations_relatedconstituents: '',
    indicesinformations_weightageoflargestconstituent: '',
    indicesinformations_weightageoftop5constituents: '',
    indicesinformations_alltimehigh: '',
    indicesinformations_alltimelow: '',
    indicesinformations_warketcapitalization: '',
    indicesinformations_weightingmethodology: '',
    indicesinformations_yeartodatereturn: '',
    indicesinformations_pricetoearningratio: '',
  });

  const addRow = () => {
    if (
      information.every(() => {
        return true;
      })
    ) {
      setData([
        ...data,
        {
          indicesinformations_countriesrepresented,
          indicesinformations_centralbank,
          indicesinformations_nickname,
          indicesinformations_relatedconstituents,
          indicesinformations_weightageoflargestconstituent,
          indicesinformations_weightageoftop5constituents,
          indicesinformations_alltimehigh,
          indicesinformations_alltimelow,
          indicesinformations_warketcapitalization,
          indicesinformations_weightingmethodology,
          indicesinformations_yeartodatereturn,
          indicesinformations_pricetoearningratio,
        },
      ]);
      // Reset input fields after adding a row
      setCountrName({
        indicesinformations_countriesrepresented: '',
        indicesinformations_centralbank: '',
        indicesinformations_nickname: '',
        indicesinformations_relatedconstituents: '',
        indicesinformations_weightageoflargestconstituent: '',
        indicesinformations_weightageoftop5constituents: '',
        indicesinformations_alltimehigh: '',
        indicesinformations_alltimelow: '',
        indicesinformations_warketcapitalization: '',
        indicesinformations_weightingmethodology: '',
        indicesinformations_yeartodatereturn: '',
        indicesinformations_pricetoearningratio: '',
      });
    }
  };

  const removeRow = (index) => {
    const newData = data.filter((_, i) => i !== index);
    setData(newData);
  };

  // useEffect(() => {
  //   onCountryDataChange(data);
  // }, [data]);

  return (
    <Expandable title="Information">
      <div className="rounded-sm bg-white p-[30px]">
        <div className="grid grid-cols-4 gap-3 mt-[10px]">
          <CustomTextField
            value={information.indicesinformations_countriesrepresented}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_countriesrepresented: e.target.value, // Update the specific key
              }))
            }
            helper_text="Countries Represented"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_centralbank}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_centralbank: e.target.value, // Update the specific key
              }))
            }
            helper_text="Central Bank"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_nickname}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_nickname: e.target.value, // Update the specific key
              }))
            }
            helper_text="Nickname"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_relatedconstituents}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_relatedconstituents: e.target.value, // Update the specific key
              }))
            }
            helper_text="Related Constituents"
            helper_text_up_position
          />
          <CustomTextField
            value={
              information.indicesinformations_weightageoflargestconstituent
            }
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_weightageoflargestconstituent:
                  e.target.value, // Update the specific key
              }))
            }
            helper_text="Weightage of Largest Constituent"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_weightageoftop5constituents}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_weightageoftop5constituents: e.target.value, // Update the specific key
              }))
            }
            helper_text="Weightage of Top 5 Constituents"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_alltimehigh}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_alltimehigh: e.target.value, // Update the specific key
              }))
            }
            helper_text="All tome High"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_alltimelow}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_alltimelow: e.target.value, // Update the specific key
              }))
            }
            helper_text="All time low"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_warketcapitalization}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_warketcapitalization: e.target.value, // Update the specific key
              }))
            }
            helper_text="Market Capitalization"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_weightingmethodology}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_weightingmethodology: e.target.value, // Update the specific key
              }))
            }
            helper_text="Weighting Methodology"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_yeartodatereturn}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_yeartodatereturn: e.target.value, // Update the specific key
              }))
            }
            helper_text="Year to Date Return"
            helper_text_up_position
          />
          <CustomTextField
            value={information.indicesinformations_pricetoearningratio}
            onChange={(e) =>
              setInformation((prevInfo) => ({
                ...prevInfo,
                indicesinformations_pricetoearningratio: e.target.value, // Update the specific key
              }))
            }
            helper_text="Price to earning Ratio"
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
                {item.countries} - {item.pairsthatcorrelate} - {item.highslows}{' '}
                - {item.pairtype} - {item.dailyavrage}
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
    </Expandable>
  );
}

export default IndicesInformation;
