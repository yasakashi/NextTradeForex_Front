import React, { useEffect, useState } from 'react';
import Sentiments from '../forex/Sentiments';
import TextBox from '../forex/TextBox';
import ReadMoreContent from '../ScrollBox';
import CountryBox from '../CountryBox';
import TradingViewWidget from '../forex/Wigets/Chart';
import FundamentalSammary from '../Summary/Fundamental';
import TechnicalSammary from '../Summary/Technical';
import RelatedRecourses from '../RelatedRecourses';
import CustomCarousel from '../Carousel';
import {
  getCommoditiesCurrencies,
  getCommodityItem,
  getCommodityRelatedContent,
} from '../../../pages/market_pulse/api';
import SearchBox from '../Searchbox';
import LoadingSpinner from '../../Loading';

export default function CommodityStory({
  selectedTopCategory,
  selectedSubCategory,
  selectedSecondCategory,
}) {
  const [currencies, setCurrencies] = useState([]);
  const [data, setData] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [relatedContent, setRelatedContent] = useState();
  const [query, setQuery] = useState('');
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [forexItemsLoading, setCommodityItemsLoading] = useState(false);
  const [widgets, setWidgets] = useState([]);
  const getRelatedSources = async (id) => {
    try {
      if (id) {
        const res = await getCommodityRelatedContent(id);
        setRelatedContent(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch related contents', error);
    }
  };
  const getCurrencies = async () => {
    setCurrencies([]);
    try {
      if (selectedTopCategory || selectedSubCategory) {
        setCurrenciesLoading(true);
        setCommodityItemsLoading(true);
        const res = await getCommoditiesCurrencies(selectedSubCategory);
        setCurrencies(res.messageData);
        setCurrenciesLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch Currencies:', error);
    }
  };

  const fetchCommodityData = async (id) => {
    try {
      if (id) {
        setCommodityItemsLoading(true);
        const res = await getCommodityItem({
          categoryId: id,
          id: null,
        });
        console.log(res.messageData);
        setCommodityItemsLoading(false);
        setData(res.messageData[0].comodities[0]);
        setWidgets(res.messageData[0].fundamentalandtechnicaltabsection);
      }
    } catch (error) {
      console.error('Failed to fetch commodity item:', error);
    } finally {
    }
  };

  useEffect(() => {
    console.log(selectedTopCategory);

    if (selectedTopCategory == 1086) {
      fetchCommodityData(1086);
    }

    getCurrencies();
    getRelatedSources(selectedSubCategory);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (!currencies?.length) return;
    const firstItem = currencies?.[0];
    fetchCommodityData(firstItem.id);
  }, [currencies]);

  useEffect(() => {
    setData(null);
    fetchCommodityData(currencyId);
  }, [currencyId]);

  useEffect(() => {
    setData(null);
    fetchCommodityData(selectedSecondCategory);
  }, [selectedSecondCategory]);

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
                {data.maintitle}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {data.flexibleBlocklist &&
                  Object.entries(data.flexibleBlocklist[0])
                    .filter((el) => {
                      return el[0] !== 'marketpulsforexid' && el[0] !== 'id';
                    })
                    .map((el) => {
                      return (
                        <React.Fragment key={el[0]}>
                          <TextBox title={el[0]} description={el[1]} />
                        </React.Fragment>
                      );
                    })}
              </div>
              <ReadMoreContent content={data.chartdescription} />
              <div className="h-[550px]">
                {data.singlepagechartimage ? (
                  <TradingViewWidget symbol={data.singlepagechartimage} />
                ) : null}
              </div>
            </>
          ) : forexItemsLoading ? (
            <LoadingSpinner />
          ) : !forexItemsLoading && !data ? (
            <div>
              <h2 className="text-link-water text-xl font-bold mb-2">
                There is no data to show !
              </h2>
            </div>
          ) : (
            <></>
          )}
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
              fetchForexItems={fetchCommodityData}
              query={query}
            />
          ) : (
            currenciesLoading && <LoadingSpinner />
          )}
        </div>
      </div>
      {data ? (
        <>
          <div className="grid grid-cols-2">
            <CountryBox
              title={data?.firstcontryheading || ''}
              data={data?.comoditiesfirstcountrydatacountriesdatalist[0] || {}}
            />
            <div className="flex gap-10">
              <div className="h-auto w-px bg-gold-light_400 mx-4"></div>
              <CountryBox
                title={data.secondcontryheading || ''}
                data={
                  data.comoditiessecondcountrydatacountriesdatalist[0] || {}
                }
              />
            </div>
          </div>
          <ReadMoreContent content={data.bottomdescription} />
          <div className="flex flex-col gap-y-20">
            {data ? (
              <FundamentalSammary
                heading="Fundamental Summary"
                tabs={widgets?.fundamentalnewssections}
              />
            ) : null}
            {data ? (
              <TechnicalSammary
                heading="Technical Summary"
                tabs={widgets?.technicaltabs}
              />
            ) : null}
          </div>
          <h3 className="text-link-water text-3xl font-extrabold mt-5">
            Related Resources
          </h3>
          {widgets.pdfsectionlist.map((pdf) => (
            <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />
          ))}
          {widgets.urlsectionlist.map((url) => (
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
