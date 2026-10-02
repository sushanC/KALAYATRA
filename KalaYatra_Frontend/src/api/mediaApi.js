import client from './client';

export const getAllMedia = async () => {
  const { data } = await client.get('/api/media');
  return data.data;
};

export const getMediaByCity = async (citySlug) => {
  const { data } = await client.get(`/api/media/city/${citySlug}`);
  return data.data;
};

export const getMediaByArtForm = async (artFormId) => {
  const { data } = await client.get(`/api/media/art-form/${artFormId}`);
  return data.data;
};

export const getMediaById = async (id) => {
  const { data } = await client.get(`/api/media/${id}`);
  return data.data;
};
