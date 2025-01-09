import { axiosInstance, axiosPrivate } from '../../axios/axiosInstance';

export const getCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get('/api/marketpuls/getcurrencies', {
      headers: { 'Content-Type': 'application/json' },
    });

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getforexitems = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getforexitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getIndiceItems = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post('/api/marketpuls/getindiceitems', {
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        categoryid: categoryId,
        id,
      }),
    });

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const getForexCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getforexcurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getIndiceCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getIndicecurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getIndiceSubCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getindicesubcategories',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getForexRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getIndiceRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getindicesforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getCommodityItem = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getcomodityitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
export const getCommoditiesCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/comodity/getcurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getCommodityRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getcomodityforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getCryptoItem = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getcryptoitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getCryptoCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/crypto/getcurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getCryptoRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getcryptoforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getstockItem = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getstockitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getstockCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/stock/getcurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getstockRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getstockforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getChartingItem = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getforexchartitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getChartingCurrencies = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/stock/getcurrencies',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getChartingRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/forexchart/getforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getStrategyContents = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/getstrategycontenttypes',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};

export const getStrategyItem = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/strategy/getstrategyitems',
      {
        categoryid: categoryId,
        id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getStrategyRelatedContent = async (id) => {
  try {
    const { data } = await axiosPrivate.post(
      '/api/marketpuls/strategy/getforummessages',
      {
        categoryid: id,
      },
      { headers: { 'Content-Type': 'application/json' } }
    );

    return data;
  } catch (error) {
    console.log('error daram');

    throw new Error(`${error}`);
  }
};
