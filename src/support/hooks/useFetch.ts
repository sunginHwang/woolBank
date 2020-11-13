import { useEffect, useState } from 'react';
import apiCall from '@support/util/apiCall';
import { delay } from '@support/util/delay';

type useFetchReturnType<T> = [T | null, boolean, Error | null, (url: string) => void, () => void];

export default function useFetch<T>(fetchUrl: string, useDelay: boolean = false): useFetchReturnType<T> {
  // 최초 로드를 자동으로 할경우 로딩 부터 시작되도록한다.
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const [url, setUrl] = useState<string>(fetchUrl);

  const onFetch = async () => {
    try {
      const result = await apiCall.get(url);

      if (useDelay) {
        await delay(400);
      }

      setData(result.data.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  // useEffectFetch 이 켜져 있을 경우만 훅으로 돌도록 처리
  useEffect(() => {
    onFetch();
  }, [url]);

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [data, isLoading, error, setUrl, onReset];
}
