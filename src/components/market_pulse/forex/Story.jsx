import React, { useEffect, useState } from 'react';
import Sentiments from './Sentiments';
import TextBox from './TextBox';
import ReadMoreContent from '../ScrollBox';
import CountryBox from '../CountryBox';
import TradingViewWidget from '../Widget';
import FundamentalSammary from '../Summary/Fundamental';
import TechnicalSammary from '../Summary/Technical';
import RelatedRecourses from '../RelatedRecourses';
import CustomCarousel from '../Carousel';

const euroDollar = [
  { title: 'Countries', description: 'Eurozone/United States' },
  { title: '2022 HIGHS & LOWS', description: '1.15123/0.95542' },
  { title: 'PAIRS THAT CORRELATE', description: 'EUR/CAD, EUR/AUD, NZD/USD' },
  { title: 'PAIR TYPE', description: 'Major' },
  { title: 'DAILY AVERAGE MOVEMENT IN PIPS', description: '107.4' },
];

const usd = [
  { title: 'Country', description: 'United States' },
  { title: 'CENTRAL BANK', description: 'Federal Reserve System' },
  { title: 'NICKNAME', description: 'Buck,Greenback' },
  { title: '%OF AVERAGE DAILY TURNOVER', description: '84.9%' },
];

const eur = [
  { title: 'Country', description: 'Eurozone' },
  { title: 'CENTRAL BANK', description: 'European Central Bank' },
  { title: 'NICKNAME', description: 'Fiber' },
  { title: '%OF AVERAGE DAILY TURNOVER', description: '39.1%' },
];

export default function Story({ forexItems }) {
  const [data, setData] = useState();

  useEffect(() => {
    setData(forexItems[0]);
  }, [forexItems]);

  return (
    <div className="w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8">
      <Sentiments
        title={data?.marketsentimentstitle || ''}
        data={data?.marketsentimentsscript || ''}
      />
      <div className="flex gap-10">
        <div className="w-2/3 flex flex-col  gap-y-8">
          <p className="text-gold-light_400 text-5xl font-bold">
            {data?.coursetitle}
          </p>
          <div className="grid grid-cols-2 gap-4">
            {data?.flexibleBlocklist &&
              Object.entries(data?.flexibleBlocklist[0])?.map((el) => (
                <React.Fragment key={el[0]}>
                  <TextBox title={el[0]} description={el[1]} />
                </React.Fragment>
              ))}
          </div>
          <div className="h-[550px]">
            <TradingViewWidget symbol={data?.chartdescription} />
          </div>
        </div>
        <div className="w-1/3 min-h-screen bg-primary"></div>
      </div>
      <ReadMoreContent content={data?.maindescription} />
      <div className="grid grid-cols-2">
        <CountryBox
          title={data?.firstcountryheading || ''}
          data={data?.firstCountryDatalist[0] || {}}
        />
        <div className="flex gap-10">
          <div class="h-auto w-px bg-gold-light_400 mx-4"></div>
          <CountryBox
            title={data?.secondcountryheading || ''}
            data={data?.secondCountryDatalist[0] || {}}
          />
        </div>
      </div>
      <p className="w-2/3 text-gray-light">{data?.bottomdescription}</p>
      <div className="flex flex-col gap-y-20">
        <FundamentalSammary heading={data?.fundamentalheading || ''} />
        <TechnicalSammary
          heading={data?.technicalheading || ''}
          tabs={data?.technicalTabslist}
        />
      </div>
      <h3 className="text-link-water text-3xl font-extrabold mb-5">
        Related Resources
      </h3>
      {data?.pdfSectionlist.map((pdf) => {
        <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />;
      })}
      {data?.urlSectionlist.map((url) => {
        <RelatedRecourses key={url?.id} data={url} tag="URL" />;
      })}

      <div>
        <h3 className="text-link-water text-3xl font-extrabold mb-5">
          Related Content
        </h3>
        <CustomCarousel />
      </div>
    </div>
  );
}
