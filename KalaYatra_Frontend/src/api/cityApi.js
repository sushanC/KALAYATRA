import client from './client';

export const getCities = async () => {
  const { data } = await client.get('/api/cities');
  return data.data;
};

export const getCityBySlug = async (slug) => {
  const { data } = await client.get(`/api/cities/${slug}`);
  return data.data;
};
