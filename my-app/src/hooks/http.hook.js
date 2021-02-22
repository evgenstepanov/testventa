import { useState, useCallback } from 'react';

export const useHttp = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const request = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      setLoading(true);
      try {
        let bodyActual = body;
        const headersActual = headers;

        if (bodyActual) {
          bodyActual = JSON.stringify(body);
          headersActual['Content-Type'] = 'application/json';
        }
        const response = await fetch(url, {
          method,
          body: bodyActual,
          headers: headersActual,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Что-то пошло не так');
        }

        setLoading(false);

        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        throw e;
      }
    },
    []
  );
  return { loading, request, error };
};
