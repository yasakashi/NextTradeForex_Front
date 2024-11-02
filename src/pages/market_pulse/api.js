import { axiosInstance, axiosPrivate } from '../../axios/axiosInstance';

export const getCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get('/api/marketpuls/getcurrencies');
  
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};

export const getforexitems = async ({ categoryId, id }) => {
  try {
    const { data } = await axiosPrivate.post('/api/marketpuls/getforexitems', {
      categoryid: categoryId,
      id,
    });
    return data;
  } catch (error) {
    throw new Error(`${error}`);
  }
};
