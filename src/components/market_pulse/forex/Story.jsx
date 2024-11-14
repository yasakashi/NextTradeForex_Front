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
import {
  getForexCurrencies,
  getforexitems,
  getRelatedContent,
} from '../../../pages/market_pulse/api';
import SearchBox from '../Searchbox';
import LoadingSpinner from '../../Loading';

export default function Story({ selectedSubCategory }) {
  const [currencies, setCurrencies] = useState([]);
  const [data, setData] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [relatedContent, setRelatedContent] = useState();
  const [query, setQuery] = useState('');
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [forexItemsLoading, setForexItemsLoading] = useState(false);

  const getRelatedSources = async (id) => {
    try {
      if (id) {
        const res = await getRelatedContent(id);
        setRelatedContent(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch related contents', error);
    }
  };
  const getCurrencies = async () => {
    setCurrencies([]);
    try {
      if (selectedSubCategory) {
        setCurrenciesLoading(true);
        const res = await getForexCurrencies(selectedSubCategory);
        setCurrencies(res.messageData);
        setCurrenciesLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch Currencies:', error);
    }
  };

  const fetchForexItems = async (id) => {
    try {
      if (id) {
        setForexItemsLoading(true);
        const res = await getforexitems({
          categoryId: id,
          id: null,
        });
        setForexItemsLoading(false);
        setData(res.messageData[0]);
      }
    } catch (error) {
      console.error('Failed to fetch forex items:', error);
    } finally {
    }
  };

  useEffect(() => {
    getRelatedSources(selectedSubCategory);
    getCurrencies();
  }, [selectedSubCategory]);

  useEffect(() => {
    if (!currencies?.length) return;
    const firstItem = currencies?.[0];
    fetchForexItems(firstItem.id);
  }, [currencies]);

  useEffect(() => {
    setData(null);
    fetchForexItems();
  }, [currencyId]);

  return (
    <div className="w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8">
      {data && (
        <Sentiments
          title={data.marketsentimentstitle || ''}
          data={data.marketsentimentsscript || ''}
        />
      )}
      <div className="flex gap-10">
        <div className="w-2/3 flex flex-col gap-y-8">
          {data ? (
            <>
              <p className="text-gold-light_400 text-5xl font-bold">
                {data.coursetitle}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {data.flexibleBlocklist &&
                  Object.entries(data.flexibleBlocklist[0]).map((el) => (
                    <React.Fragment key={el[0]}>
                      <TextBox title={el[0]} description={el[1]} />
                    </React.Fragment>
                  ))}
              </div>
              <ReadMoreContent content={data.chartdescription} />
              <div className="h-[550px]">
                {data.singlepagechartimage ? (
                  <TradingViewWidget symbol={data.singlepagechartimage} />
                ) : null}
              </div>
            </>
          ) : forexItemsLoading ? <LoadingSpinner /> : (
            !data && !forexItemsLoading
          ) ? (
            <div>
              <h2 className="text-link-water text-xl font-bold mb-2">
                There is no data to show !
              </h2>
            </div>
          ): <></>}
        </div>
        <div className="w-1/3 h-screen  bg-primary p-5 z-10 relative right-0">
          <h2 className="text-link-water text-xl font-bold mb-2">Currencies</h2>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name..."
            className="border p-2 rounded-md w-full max-w-md mb-4"
          />
          {currencies?.length > 0 ? (
            <SearchBox
              currencies={currencies}
              setCurrencies={setCurrencies}
              setCurrencyId={setCurrencyId}
              fetchForexItems={fetchForexItems}
              query={query}
            />
          ) : (
            currenciesLoading && <LoadingSpinner />
          )}
        </div>
      </div>
      {data ? (
        <>
          <ReadMoreContent content={data.maindescription} />
          <div className="grid grid-cols-2">
            <CountryBox
              title={data.firstcountryheading || ''}
              data={data.firstCountryDatalist[0] || {}}
            />
            <div className="flex gap-10">
              <div className="h-auto w-px bg-gold-light_400 mx-4"></div>
              <CountryBox
                title={data.secondcountryheading || ''}
                data={data.secondCountryDatalist[0] || {}}
              />
            </div>
          </div>
          <ReadMoreContent content={data.bottomdescription} />
          <div className="flex flex-col gap-y-20">
            {data ? (
              <FundamentalSammary
                heading={data.fundamentalheading}
                tabs={data.fundamentalNewsSectionlist}
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
          {data.pdfSectionlist.map((pdf) => (
            <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />
          ))}
          {data.urlSectionlist.map((url) => (
            <RelatedRecourses key={url?.id} data={url} tag="URL" />
          ))}

          <div>
            <h3 className="text-link-water text-3xl font-extrabold mt-6">
              Related Content
            </h3>
            <CustomCarousel data={relatedContent} />
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
}
