import { useEffect, useState } from 'react';
import CustomTextField, {
  CustomTextArea,
} from '../../common/custom_text_field';
import Expandable from '../Expandable';
import PdfSection from './PdfSection';
import UrlSection from './UrlSection';
import FundamentalSection from './FundamentalSection';
import { selectForexData } from '../../redux/features/marketPulse/marketPulseSlice';
import { useSelector } from 'react-redux';

function Fundamental({ onFundamentalChange }) {
  const forexData = useSelector(selectForexData);
  const [instrumentName, setInstrumentName] = useState(
    forexData?.instrumentname || ''
  );
  const [fundamentalHeading, setFundamentalHeading] = useState(
    forexData?.fundamentalheading || ''
  );
  const [technicalheading, setTechnicalheading] = useState(
    forexData?.fundamentalheading || ''
  );
  const [marketsessiontitle, setMarketsessiontitle] = useState(
    forexData?.marketsessiontitle || ''
  );
  const [marketsessionScript, setMarketsessionScript] = useState(
    forexData?.marketsessionscript || ''
  );
  const [marketsentimentstitle, setMarketsentimentstitle] = useState(
    forexData?.marketsentimentstitle || ''
  );
  const [marketsentimentsscript, setMarketsentimentsscript] = useState(
    forexData?.marketsentimentsscript || ''
  );

  const [TechnicalTabslist, setTechnicalTabslist] = useState([]);
  const [FundamentalNewsSectionlist, setFundamentalNewsSectionlist] = useState([]);
  const [URLSectionlist, setURLSectionlist] = useState([]);
  const [PDFSectionlist, setPDFSectionlist] = useState([]);

  useEffect(() => {
    const currencyData = {
      instrumentName,
      marketsessiontitle,
      marketsessionScript,
      marketsentimentstitle,
      marketsentimentsscript,
      TechnicalTabslist,
      FundamentalNewsSectionlist,
      URLSectionlist,
      PDFSectionlist,
    };

    onFundamentalChange(currencyData);
  }, [
    instrumentName,
    marketsessiontitle,
    marketsessionScript,
    marketsentimentstitle,
    marketsentimentsscript,
    onFundamentalChange,
    TechnicalTabslist,
    URLSectionlist,
    PDFSectionlist,
  ]);

  return (
    <Expandable title="Fundamental and Technical">
      <div className="rounded-sm bg-white p-[30px]">
        <CustomTextField
          helper_text="Instrument Name"
          helper_text_up_position
          value={instrumentName}
          onChange={(e) => setInstrumentName(e.target.value)}
        />
        {/* <CustomTextField
          helper_text="fundamental heading"
          helper_text_up_position
          value={fundamentalHeading}
          onChange={(e) =>setFundamentalHeading(e.target.value)}
        />

        <h2>Fundamental News Section</h2>
        <FundamentalSection subItemName="technicalBreakingNewslist" onDataChange={setTechnicalTabslist} /> */}

        <hr className="my-[20px]" />
        <CustomTextField
          helper_text="technical heading"
          helper_text_up_position
          value={technicalheading}
          onChange={(e) => setTechnicalheading(e.target.value)}
        />

        <h2>Technical Tabs</h2>
        <FundamentalSection
          subItemName="technicalBreakingNewslist"
          onDataChange={setTechnicalTabslist}
        />

        <h2>Fundamental Tabs</h2>
        <FundamentalSection
          subItemName="technicalBreakingNewslist"
          onDataChange={setFundamentalNewsSectionlist}
        />

        <hr className="my-[20px]" />
        <h2>Related Resorces</h2>
        <PdfSection
          pdfData={forexData?.pdfSectionlist}
          onDataChange={setPDFSectionlist}
        />
        <UrlSection
          urlData={forexData?.urlSectionlist}
          onDataChange={setURLSectionlist}
        />

        <hr className="my-[20px]" />
        <CustomTextField
          helper_text="Market Session Title"
          helper_text_up_position
          value={marketsessiontitle}
          onChange={(e) => setMarketsessiontitle(e.target.value)}
        />

        <CustomTextArea
          label="Market Session Script"
          value={marketsessionScript}
          set_value={setMarketsessionScript}
        />

        <hr className="my-[20px]" />

        <CustomTextField
          helper_text="Market Sentiments Title"
          helper_text_up_position
          value={marketsentimentstitle}
          onChange={(e) => setMarketsentimentstitle(e.target.value)}
        />

        <CustomTextArea
          label="Market Sentiments Script"
          value={marketsentimentsscript}
          set_value={setMarketsentimentsscript}
        />
      </div>
    </Expandable>
  );
}

export default Fundamental;
