import client from './client';

export const getArtForms = async (params = {}) => {
  const { data } = await client.get('/api/art-forms', { params });
  return data.data;
};

export const getArtFormBySlug = async (slug) => {
  const { data } = await client.get(`/api/art-forms/${slug}`);
  return data.data;
};

export const getArtFormsByCity = async (citySlug) => {
  const { data } = await client.get(`/api/art-forms/city/${citySlug}`);
  return data.data;
};

export const getArtFormsByCategory = async (category) => {
  const { data } = await client.get(`/api/art-forms/category/${encodeURIComponent(category)}`);
  return data.data;
};
