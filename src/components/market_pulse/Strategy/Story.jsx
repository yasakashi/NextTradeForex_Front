import React, { useEffect, useState } from 'react';
import TextBox from '../forex/TextBox';
import ReadMoreContent from '../ScrollBox';
import CountryBox from '../CountryBox';
import FundamentalSammary from '../Summary/Fundamental';
import TechnicalSammary from '../Summary/Technical';
import RelatedRecourses from '../RelatedRecourses';
import CustomCarousel from '../Carousel';
import {
  getChartingCurrencies,
  getChartingItem,
  getStrategyItem,
  getStrategyRelatedContent,
} from '../../../pages/market_pulse/api';
import SearchBox from '../Searchbox';
import LoadingSpinner from '../../Loading';

export default function StrategyStory({ selectedSubCategory }) {
  const [currencies, setCurrencies] = useState([]);
  const [data, setData] = useState(null);
  const [currencyId, setCurrencyId] = useState(null);
  const [relatedContent, setRelatedContent] = useState();
  const [query, setQuery] = useState('');
  const [currenciesLoading, setCurrenciesLoading] = useState(false);
  const [Charting, setCharting] = useState(false);

  const getRelatedSources = async (id) => {
    try {
      if (id) {
        const res = await getStrategyRelatedContent(id);
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
        setCharting(true);
        const res = await getChartingCurrencies(selectedSubCategory);
        setCurrencies(res.messageData);
        setCurrenciesLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch Currencies:', error);
    }
  };

  const fetchStrategy = async (id) => {
    try {
      if (id) {
        setCharting(true);
        const res = await getStrategyItem({
          categoryId: id,
          id: null,
        });
        setCharting(false);
        setData(res.messageData[0]);
      }
    } catch (error) {
      console.error('Failed to fetch forex items:', error);
    } finally {
    }
  };

  useEffect(() => {
    getCurrencies();
    getRelatedSources(selectedSubCategory);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (!currencies?.length) return;
    const firstItem = currencies?.[0];
    fetchStrategy(firstItem.id);
  }, [currencies]);

  useEffect(() => {
    setData(null);
    fetchStrategy();
  }, [currencyId]);

  return (
    <div className="w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8">
      <div className="flex gap-10">
        <div className="w-2/3 flex flex-col gap-y-8">
          {data ? (
            <>
              <p className="text-gold-light_400 text-5xl font-bold">
                {data.title}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {data.forexflexibleblocks &&
                  Object.entries(data.forexflexibleblocks[0]).map((el) => {
                    return (
                      <React.Fragment key={el[0]}>
                        <TextBox title={el[0]} description={el[1]} />
                      </React.Fragment>
                    );
                  })}
              </div>
              <ReadMoreContent content={data.chartdescription} />
            </>
          ) : Charting ? (
            <LoadingSpinner />
          ) : !Charting && !data ? (
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
              fetchCharting={fetchStrategy}
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
            {data.forexflexibleblocks[0].countriesdatalist.map((el) => (
              <CountryBox title={el.contry || ''} data={el || {}} />
            ))}
          </div>
          <ReadMoreContent
            content={data.forexflexibleblocks[0].bottomdescription}
          />
          <div className="flex flex-col gap-y-20">
            {data ? (
              <FundamentalSammary
                heading="Fundamental"
                tabs={
                  data.fundamentalandtechnicaltabsection.fundamentalnewssectionlist
                }
              />
            ) : null}
            {data ? (
              <TechnicalSammary
                heading="Technical"
                tabs={data.fundamentalandtechnicaltabsection.technicaltablist}
              />
            ) : null}
          </div>
          <h3 className="text-link-water text-3xl font-extrabold mt-5">
            Related Resources
          </h3>
          {data.fundamentalandtechnicaltabsection.pdfsectionlist.map((pdf) => (
            <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />
          ))}
          {data.fundamentalandtechnicaltabsection.urlsectionlist.map((url) => (
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
