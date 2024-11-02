import React from 'react';
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

export default function Story({ forexitems }) {
  
  return (

    <div className="w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8">
      <Sentiments />
      <div className="flex gap-10">
        <div className="w-2/3 flex flex-col  gap-y-8">
          <p className="text-gold-light_400 text-5xl font-bold">
            Euro vs US Dollar-EURUSD
          </p>
          <div className="grid grid-cols-2 gap-4">
            {euroDollar.map((el) => (
              <React.Fragment key={el.title}>
                <TextBox title={el.title} description={el.description} />
              </React.Fragment>
            ))}
          </div>
          <TextBox
            title={'ONE-YEAR CHART'}
            description={'EUR/USD Chart'}
          ></TextBox>
          <div className="h-[550px]">
            <TradingViewWidget />
          </div>
        </div>
        <div className="w-1/3 min-h-screen bg-primary"></div>
      </div>

      <ReadMoreContent />
      <div className="grid grid-cols-2">
        <CountryBox title="EUR" data={eur} />
        <div className="flex gap-10">
          <div class="h-auto w-px bg-gold-light_400 mx-4"></div>
          <CountryBox title="USD" data={usd} />
        </div>
      </div>
      <p className="w-2/3 text-gray-light">
        Foreign exchange trading carries a high level of risk that may not be
        suitable for all investors. Next Trade provides this information as an
        educational service to its clients and prospects and does not endorse
        opinions or recommendations. The information provided does not
        constitute investment or trading advice.
      </p>
      <div className="flex flex-col gap-y-20">
        <FundamentalSammary />
        <TechnicalSammary />
      </div>
      <h3 className="text-link-water text-3xl font-extrabold mb-5">
        Related Resources
      </h3>
      <RelatedRecourses />
      <div>
        <h3 className="text-link-water text-3xl font-extrabold mb-5">
          Related Content
        </h3>
        <CustomCarousel />
      </div>
    </div>
  );
}
