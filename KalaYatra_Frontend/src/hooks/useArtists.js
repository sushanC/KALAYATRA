import { useState, useEffect } from 'react';
import { getArtistsByCity, getArtists } from '../api/artistApi';

export function useArtists(citySlug = null) {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);

    const fetchFn = citySlug
      ? getArtistsByCity(citySlug)
      : getArtists();

    fetchFn
      .then((data) => {
        if (!cancelled) {
          setArtists(Array.isArray(data) ? data : []);
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

  return { artists, loading, error };
}
