import { useState, useEffect } from 'react';
import { getArtFormsByCity, getArtForms } from '../api/artFormApi';

export function useArtForms(citySlug = null) {
  const [artForms, setArtForms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchFn = citySlug
      ? getArtFormsByCity(citySlug)
      : getArtForms();

    fetchFn
      .then((data) => {
        if (!cancelled) {
          setArtForms(Array.isArray(data) ? data : []);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err.message);
          setLoading(false);
        }
      });

    return () => { cancelled = true; };
  }, [citySlug]);

  return { artForms, loading, error };
}
