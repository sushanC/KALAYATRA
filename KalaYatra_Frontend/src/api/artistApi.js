import client from './client';

export const getArtists = async (params = {}) => {
  const { data } = await client.get('/api/artists', { params });
  return data.data;
};

export const getArtistBySlug = async (slug) => {
  const { data } = await client.get(`/api/artists/${slug}`);
  return data.data;
};

export const getArtistsByCity = async (citySlug) => {
  const { data } = await client.get(`/api/artists/city/${citySlug}`);
  return data.data;
};

export const getDemoArtists = async () => {
  const { data } = await client.get('/api/artists/demo');
  return data.data;
};
