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
  setSecondCategory,
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
        setData({
          id: '3b272e51-8d53-445d-b985-91883d06fa96',
          categoryid: 900,
          createdatetime: '2024-11-20T09:36:18.32',
          creatoruserid: 21,
          price: 0.0,
          isvisible: true,
          courseleveltypeId: 1,
          coursetitle: 'coursetitle',
          excerpt: 'excerpt',
          author: 'author',
          instrumentname: 'instrumentname',
          fundamentalheading: 'fundamentalheading',
          technicalheading: 'technicalheading',
          marketsessiontitle: 'marketsessiontitle',
          marketsessionscript: 'marketsessionscript',
          marketsentimentstitle: 'marketsentimentstitle',
          marketsentimentsscript: 'marketsentimentsscript',
          relatedresorces: 'relatedresorces',
          privatenotes: 'privatenotes',
          newstickernew: 'newstickernew',
          newstickerupdate: 'newstickerupdate',
          newstickerimportant: 'newstickerimportant',
          parentindex: 'parentindex',
          indicesinformations_countriesrepresented:
            'indicesinformations_countriesrepresented',
          indicesinformations_centralbank: 'indicesinformations_centralbank',
          indicesinformations_nickname: 'indicesinformations_nickname',
          indicesinformations_relatedconstituents:
            'indicesinformations_relatedconstituents',
          indicesinformations_weightageoflargestconstituent:
            'indicesinformations_weightageoflargestconstituent',
          indicesinformations_weightageoftop5constituents:
            'indicesinformations_weightageoftop5constituents',
          indicesinformations_alltimehigh: 'indicesinformations_alltimehigh',
          indicesinformations_alltimelow: 'indicesinformations_alltimelow',
          indicesinformations_warketcapitalization:
            'indicesinformations_warketcapitalization',
          indicesinformations_weightingmethodology:
            'indicesinformations_weightingmethodology',
          indicesinformations_yeartodatereturn:
            'indicesinformations_yeartodatereturn',
          indicesinformations_pricetoearningratio:
            'indicesinformations_pricetoearningratio',
          chart: 'chart',
          maindescription: 'maindescription',
          maindescription_filecontenttype: 'maindescription_filecontenttype',
          maindescription_filepath: null,
          maindescription_filename: null,
          indicefundamentalnewssectionlist: [
            {
              id: 'c59ad699-13c5-44db-b52c-6b0617db3184',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              maintitle: 'maintitle',
              script: 'script',
              newsmaincontentlist: [
                {
                  id: '32f3af2e-91bb-46d6-bee2-c0bd0d0f6934',
                  marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
                  fundamentalnewssectionid:
                    'c59ad699-13c5-44db-b52c-6b0617db3184',
                  title: 'title',
                  description: 'description',
                  link: 'link',
                  newsmaincontentfilename: null,
                  newsmaincontentfilepath: null,
                  newsmaincontentfilecontenttype: null,
                },
              ],
            },
          ],
          indicealternateindicelist: [
            {
              id: 'f893d9b8-29df-4d89-b7c3-e41dc9d338ac',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              name: 'name',
              link: 'link',
            },
          ],
          indicechildindicelist: [
            {
              id: 'b1c82cc3-8317-4041-bb7f-6ead7e23491a',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              name: 'name',
              link: 'link',
            },
          ],
          indicepdfsectionlist: [
            {
              id: '7e73d9ab-6074-4b46-b2c2-20cbf2ca680a',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              pdftitle: 'pdftitle',
              pdfshortcodeid: 'pdfshortcodeid',
              author: 'author',
              shortdescription: 'shortdescription',
            },
          ],
          indicelistedexchangelist: [
            {
              id: '519931bd-b63f-4c95-be7d-83e423121c7d',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              label: 'label',
              link: 'link',
            },
          ],
          indiceurlsectionlist: [
            {
              id: '6dabbe68-1bbb-41de-a9b0-cfc1e1695fb3',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              urltitle: 'urltitle',
              url: 'url',
            },
          ],
          indicesectorrepresentedlist: [
            {
              id: '404be833-5dda-42ae-bf20-f5edbaac9c98',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              label: 'label',
              link: 'link',
            },
          ],
          indicetechnicaltabslist: [
            {
              id: 'b9baf046-808e-4060-9717-7ebdb46cad82',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              tabtitle: 'tabtitle',
              script: 'script',
              technicalbreakingnewslist: [
                {
                  id: '8417d8d3-94c8-4739-8e9e-d5b8f31a7da5',
                  marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
                  technicaltabsid: 'b9baf046-808e-4060-9717-7ebdb46cad82',
                  title: 'title',
                  description: 'description',
                  link: 'link',
                  newsmaincontentfilename: null,
                  newsmaincontentfilepath: null,
                  newsmaincontentfilecontenttype: null,
                },
              ],
            },
          ],
          indicerelatedinstumentlist: [
            {
              id: '3e731187-8025-432b-948c-cccc671f4376',
              marketpulsindiceid: '3b272e51-8d53-445d-b985-91883d06fa96',
              label: 'label',
              link: 'link',
            },
          ],
        });
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
    fetchIndiceItem();
  }, [currencyId]);

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
              <div className="flex">
                <div>
                  <p className="text-gold-light_400 text-xl font-bold">
                    Indices Informations
                  </p>
                  <InfoTable data={data} />
                </div>
                <div>
                  <p className="text-gold-light_400 text-xl font-bold">
                    Listed Exchanges
                  </p>
                  <ListedExchange/>
                </div>
              </div>
              <ReadMoreContent content={data.chartdescription} />
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
          <ReadMoreContent content={data.maindescription} />
          <ReadMoreContent content={data.bottomdescription} />
          <div className="flex flex-col gap-y-20">
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
