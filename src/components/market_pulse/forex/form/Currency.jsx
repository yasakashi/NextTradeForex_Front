import { useEffect, useState } from 'react';
import DraftEditor from '../../../../admin_panel/components/editor/draft_editor';
import CustomTextField, {
  CustomTextArea,
} from '../../../../common/custom_text_field';
import { convertToRaw, EditorState } from 'draft-js';
import Expandable from '../../../Expandable';
import CountryGeneralData from '../../CountryGeneralData';
import CountrySpecificData from '../../CountrySpecificData';
import { useSelector } from 'react-redux';
import { selectForexData } from '../../../../redux/features/marketPulse/marketPulseSlice';

function Currency({ onCurrencyChange }) {
  const forexData = useSelector(selectForexData);

  const [firstCountryHeading, setFirstCountryHeading] = useState(
    forexData?.firstcountryheading || ''
  );
  const [secondCountryHeading, setSecondCountryHeading] = useState(
    forexData?.secondcountryheading || ''
  );
  const [singlePageChartImage, setSinglePageChartImage] = useState(
    forexData?.singlePageChartImage || ''
  );

  const [FlexibleBlocklist, setFlexibleBlocklist] = useState([]);
  const [FirstCountryDatalist, setFirstCountryDatalist] = useState([]);
  const [SecondCountryDatalist, setSecondCountryDatalist] = useState([]);

  // editors
  const [oneYearEditor, setOneYearEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [chartDescriptionEditor, setChartDescriptionEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [firstCountryEditor, setFirstCountryEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [secondCountryEditor, setSecondCountryEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [bottomDescriptionEditor, setBottomDescriptionEditor] = useState(() =>
    EditorState.createEmpty()
  );
  const [mainDescriptionEditor, setMainDescriptionEditor] = useState(() =>
    EditorState.createEmpty()
  );

  useEffect(() => {
    const currencyData = {
      firstCountryHeading,
      secondCountryHeading,
      singlePageChartImage,
      oneYearDescription: JSON.stringify(
        convertToRaw(oneYearEditor.getCurrentContent())
      ),
      chartDescription: JSON.stringify(
        convertToRaw(chartDescriptionEditor.getCurrentContent())
      ),
      firstCountryDescription: JSON.stringify(
        convertToRaw(firstCountryEditor.getCurrentContent())
      ),
      secondCountryDescription: JSON.stringify(
        convertToRaw(secondCountryEditor.getCurrentContent())
      ),
      bottomDescription: JSON.stringify(
        convertToRaw(bottomDescriptionEditor.getCurrentContent())
      ),
      mainDescription: JSON.stringify(
        convertToRaw(mainDescriptionEditor.getCurrentContent())
      ),
      FlexibleBlocklist,
      FirstCountryDatalist,
      SecondCountryDatalist,
    };

    onCurrencyChange(currencyData);
  }, [
    firstCountryHeading,
    secondCountryHeading,
    singlePageChartImage,
    FlexibleBlocklist,
    FirstCountryDatalist,
    SecondCountryDatalist,
    bottomDescriptionEditor,
    chartDescriptionEditor,
    firstCountryEditor,
    mainDescriptionEditor,
    onCurrencyChange,
    oneYearEditor,
    secondCountryEditor,
  ]);

 
  return (
    <Expandable title="Currency">
      <div className="rounded-sm bg-white p-[30px]">
        <h2>Flexible Blocks</h2>
        <CountryGeneralData
          flexibleBlocklist={forexData?.flexibleBlocklist}
          onCountryDataChange={setFlexibleBlocklist}
        />

        <hr className="my-[20px]" />
        <h2>One Year Description</h2>

        <DraftEditor
          editorState={oneYearEditor}
          set_editor_value={setOneYearEditor}
          initialContent={forexData?.oneyeardescription}
        />

        <hr className="my-[20px]" />
        <h2>Chart Description</h2>

        <DraftEditor
          editorState={chartDescriptionEditor}
          set_editor_value={setChartDescriptionEditor}
          initialContent={forexData?.chartdescription}
        />

        <hr className="my-[20px]" />
        <h2>First Country Heading</h2>
        <CustomTextField
          value={firstCountryHeading}
          onChange={(e) => setFirstCountryHeading(e.target.value)}
          helper_text="First country heading"
          helper_text_up_position
        />

        <hr className="my-[20px]" />
        <h2>First Country Description</h2>

        <DraftEditor
          editorState={firstCountryEditor}
          set_editor_value={setFirstCountryEditor}
          initialContent={forexData?.firstcountrydescription}
        />

        <hr className="my-[20px]" />
        <h2>First Country Data</h2>
        <CountrySpecificData
          countryData={forexData?.firstCountryDatalist}
          onCountryDataChange={setFirstCountryDatalist}
        />

        <hr className="my-[20px]" />
        <h2>Second Country Heading</h2>
        <CustomTextField
          value={secondCountryHeading}
          onChange={(e) => setSecondCountryHeading(e.target.value)}
          helper_text="Second country heading"
          helper_text_up_position
        />

        <hr className="my-[20px]" />
        <h2>Second Country Description</h2>

        <DraftEditor
          editorState={secondCountryEditor}
          set_editor_value={setSecondCountryEditor}
          initialContent={forexData?.secondcountrydescription}
        />

        <hr className="my-[20px]" />
        <h2>Second Country Data</h2>
        <CountrySpecificData
          countryData={forexData?.secondCountryDatalist}
          onCountryDataChange={setSecondCountryDatalist}
        />

        <hr className="my-[20px]" />
        <h2>Bottom Description</h2>

        <DraftEditor
          editorState={bottomDescriptionEditor}
          set_editor_value={setBottomDescriptionEditor}
          initialContent={forexData?.bottomdescription}
        />

        <hr className="my-[20px]" />
        <h2>Main Description</h2>

        <DraftEditor
          editorState={mainDescriptionEditor}
          set_editor_value={setMainDescriptionEditor}
          initialContent={forexData?.maindescription}
        />

        <hr className="my-[20px]" />
        <CustomTextArea
          label="Single Page Chart Image"
          value={singlePageChartImage}
          set_value={setSinglePageChartImage}
        />

        {/* <hr className="my-[20px]" />
        <CustomTextField
          value={privotTitle}
          onChange={setPivotTitle}
          helper_text="Pivot Points Title"
          helper_text_up_position
          placeHolder="Course Title"
        />
        <CustomTextArea label="Pivot Points Script" value={pivotScript} set_value={setPivotScript} />

        <hr className="my-[20px]" />
        <CustomTextField
          value={fibbonacciTitle}
          onChange={setFibbonacciTitle}
          helper_text="Fibbonacci Title"
          helper_text_up_position
          placeHolder="Course Title"
        />
        <CustomTextArea label="Fibbonacci Script" value={fibbonacciScript} set_value={setFibbonacciScript} />

        <hr className="my-[20px]" />
        <CustomTextField
          value={marketStrengthTitle}
          onChange={setMarketStrengthTitle}
          helper_text="Market Strength Title"
          helper_text_up_position
        />
        <CustomTextArea
          label="Market Strength Script"
          value={marketStrengthScript}
          set_value={setMarketStrengthScript}
        /> */}
      </div>
    </Expandable>
  );
}

export default Currency;
