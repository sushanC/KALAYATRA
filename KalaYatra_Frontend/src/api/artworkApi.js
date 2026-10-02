import client from './client';

export const getArtworks = async (params = {}) => {
  const { data } = await client.get('/api/artworks', { params });
  return data.data;
};

export const getArtworkBySlug = async (slug) => {
  const { data } = await client.get(`/api/artworks/${slug}`);
  return data.data;
};

export const getArtworksByCity = async (citySlug) => {
  const { data } = await client.get(`/api/artworks/city/${citySlug}`);
  return data.data;
};
