import React, { useEffect, useState } from 'react';
import Sentiments from './Sentiments';
import TextBox from './TextBox';
import ReadMoreContent from '../ScrollBox';
import CountryBox from '../CountryBox';
import TradingViewWidget from './Wigets/Chart';
import FundamentalSammary from '../Summary/Fundamental';
import TechnicalSammary from '../Summary/Technical';
import RelatedRecourses from '../RelatedRecourses';
import CustomCarousel from '../Carousel';
import SearchBox from '../Searchbox';

export default function Story({
  forexItems,
  currencies,
  setCurrencies,
  setCurrencyId,
  relatedContent,
}) {
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
          <ReadMoreContent content={data?.chartdescription} />
          <div className="h-[550px]">
            {data?.singlepagechartimage ? (
              <TradingViewWidget symbol={data.singlepagechartimage} />
            ) : null}
          </div>
        </div>
        <div className="w-1/3 min-h-screen bg-primary p-5 z-10">
          <h2 className="text-link-water text-xl font-bold mb-2">
            {currencies[0]?.categorytypename}
          </h2>
          <SearchBox
            currencies={currencies}
            setCurrencies={setCurrencies}
            setCurrencyId={setCurrencyId}
          />
        </div>
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
        {data ? (
          <FundamentalSammary
            heading={data.fundamentalheading}
            tabs={data?.fundamentalNewsSectionlist}
          />
        ) : null}
        {data ? (
          <TechnicalSammary
            heading={data.technicalheading}
            tabs={data.technicalTabslist}
          />
        ) : null}
      </div>
      <h3 className="text-link-water text-3xl font-extrabold mt-5">
        Related Resources
      </h3>
      {data?.pdfSectionlist.map((pdf) => (
        <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />
      ))}
      {data?.urlSectionlist.map((url) => (
        <RelatedRecourses key={url?.id} data={url} tag="URL" />
      ))}

      <div>
        <h3 className="text-link-water text-3xl font-extrabold mt-6">
          Related Content
        </h3>
        <CustomCarousel data={relatedContent} />
      </div>
    </div>
  );
}
