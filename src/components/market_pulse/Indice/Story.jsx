import React, { useEffect, useState } from 'react';
// import Sentiments from './Sentiments';
import TextBox from '../forex/TextBox';
import ReadMoreContent from '../ScrollBox';
import CountryBox from '../CountryBox';
import FundamentalSammary from '../Summary/Fundamental';
import TechnicalSammary from '../Summary/Technical';
import RelatedRecourses from '../RelatedRecourses';
import CustomCarousel from '../Carousel';
import {
  getIndiceItems,
  getIndiceCurrencies,
  getIndiceRelatedContent,
} from '../../../pages/market_pulse/api';
import SearchBox from '../Searchbox';
import LoadingSpinner from '../../Loading';
import InfoTable from './InfoTable';
import ListedExchange from './ListedExchanges';

export default function IndicesStory({
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
  const [indiceItemLoading, setIndiceItemLoading] = useState(false);

  const getRelatedSources = async (id) => {
    try {
      if (id) {
        const res = await getIndiceRelatedContent(id);
        setRelatedContent(res.messageData);
      }
    } catch (error) {
      console.error('Failed to fetch related contents', error);
    }
  };
  const getCurrencies = async () => {
    setCurrencies([]);
    try {
      if (selectedSubCategory || selectedTopCategory == 1175) {
        setCurrenciesLoading(true);
        setIndiceItemLoading(true);
        const res = await getIndiceCurrencies(selectedSubCategory);
        setCurrencies(res.messageData);
        setCurrenciesLoading(false);
      }
    } catch (error) {
      console.error('Failed to fetch Currencies:', error);
    }
  };

  const fetchIndiceItem = async (id) => {
    try {
      if (id) {
        setIndiceItemLoading(true);
        const res = await getIndiceItems({
          categoryId: id,
          id: null,
        });
        setIndiceItemLoading(false);
        setData(res.messageData[0]);
      }
    } catch (error) {
      console.error('Failed to fetch forex items:', error);
    } finally {
    }
  };

  useEffect(() => {
    if (selectedTopCategory == 1175) {
      fetchIndiceItem(1175);
    }
    if (selectedSubCategory == 1194) {
      fetchIndiceItem(1194);
    }
    getCurrencies();
    getRelatedSources(selectedSubCategory);
  }, [selectedSubCategory]);

  useEffect(() => {
    if (!currencies?.length) return;
    const firstItem = currencies?.[0];
    fetchIndiceItem(firstItem.id);
  }, [currencies]);

  useEffect(() => {
    setData(null);
    fetchIndiceItem(currencyId);
  }, [currencyId]);

  useEffect(() => {
    setData(null);
    fetchIndiceItem(selectedSecondCategory);
  }, [selectedSecondCategory]);

  return (
    <div className="w-4/5 flex flex-col mx-auto mt-[10rem] gap-y-8">
      {/* {data && (
        <Sentiments
          title={data.marketsentimentstitle || ''}
          data={data.marketsentimentsscript || ''}
        />
      )} */}
      <div className="flex gap-10">
        <div className="w-2/3 flex flex-col gap-y-8">
          {data ? (
            <>
              <p className="text-gold-light_400 text-5xl font-bold">
                {data.coursetitle}
              </p>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <p className="text-gold-light_400 text-xl font-bold mb-3">
                    Indices Informations
                  </p>
                  <InfoTable data={data} />
                </div>
                <div>
                  <p className="text-gold-light_400 text-xl font-bold mb-3">
                    Listed Exchanges
                  </p>
                  <ListedExchange data={data.instrumentname} />

                  <p className="text-gold-light_400 text-xl font-bold mt-12 mb-3">
                    Related Instuments
                  </p>
                  <ListedExchange data={data.instrumentname} />
                </div>
              </div>

            </>
          ) : indiceItemLoading ? (
            <LoadingSpinner />
          ) : !indiceItemLoading && !data ? (
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
              fetchForexItems={fetchIndiceItem}
              query={query}
            />
          ) : (
            currenciesLoading && <LoadingSpinner />
          )}
        </div>
      </div>
      {data ? (
        <>
          
          <div className="flex flex-col gap-y-20 mt-5">
            {data ? (
              <FundamentalSammary
                heading="Fundamental"
                tabs={data.indicefundamentalnewssectionlist}
              />
            ) : null}
            {data ? (
              <TechnicalSammary
                heading="Technical"
                tabs={data.indicetechnicaltabslist}
              />
            ) : null}
          </div>
          <h3 className="text-link-water text-3xl font-extrabold mt-5">
            Related Resources
          </h3>
          {data.indicepdfsectionlist.map((pdf) => (
            <RelatedRecourses key={pdf?.id} data={pdf} tag="PDF" />
          ))}
          {data.indiceurlsectionlist.map((url) => (
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
