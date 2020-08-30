import { useState } from 'react';
import { AxiosPromise } from 'axios';

type PromiseCreator<T> = (...params: any[]) => AxiosPromise<T>;

type UseRequestReturnType<T> = [
    T | null,
  boolean,
    Error | null,
  Function,
  () => void
];

export default function useRequest<T>(
  axiosRequest: PromiseCreator<T>
): UseRequestReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onRequest = async (...params: any[]) => {
    try {
      setLoading(true);
      const response = await axiosRequest(...params);
      setData(response.data);
    } catch (e) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [data, loading, error, onRequest, onReset];
}
