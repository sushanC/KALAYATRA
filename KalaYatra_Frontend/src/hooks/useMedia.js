import { useState, useEffect } from 'react';
import { getMediaByCity, getAllMedia } from '../api/mediaApi';

export function useMedia(citySlug = null) {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchFn = citySlug
      ? getMediaByCity(citySlug)
      : getAllMedia();

    fetchFn
      .then((data) => {
        if (!cancelled) {
          setMedia(Array.isArray(data) ? data : []);
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

  return { media, loading, error };
}
