import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCityBySlug, getCities } from '../api/cityApi';

const CityContext = createContext(null);

const DEFAULT_CITY_SLUG = 'udupi';
const STORAGE_KEY = 'kalayatra_selected_city';

export function CityProvider({ children }) {
  const [selectedCitySlug, setSelectedCitySlug] = useState(
    () => localStorage.getItem(STORAGE_KEY) || DEFAULT_CITY_SLUG
  );
  const [cityData, setCityData] = useState(null);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all cities for the selector
  useEffect(() => {
    getCities()
      .then(setCities)
      .catch(() => setCities([]));
  }, []);

  // Fetch selected city data whenever slug changes
  useEffect(() => {
    setLoading(true);
    getCityBySlug(selectedCitySlug)
      .then((data) => {
        setCityData(data);
        setLoading(false);
      })
      .catch(() => {
        setCityData(null);
        setLoading(false);
      });
  }, [selectedCitySlug]);

  const selectCity = useCallback((slug) => {
    localStorage.setItem(STORAGE_KEY, slug);
    setSelectedCitySlug(slug);
  }, []);

  const value = {
    selectedCitySlug,
    selectedCity: cityData,
    cities,
    cityLoading: loading,
    selectCity,
  };

  return <CityContext.Provider value={value}>{children}</CityContext.Provider>;
}

export function useCity() {
  const ctx = useContext(CityContext);
  if (!ctx) throw new Error('useCity must be used within a CityProvider');
  return ctx;
}
