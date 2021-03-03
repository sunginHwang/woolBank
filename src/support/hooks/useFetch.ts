import { useEffect, useState } from 'react';
import apiCall from '@support/util/apiCall';
import { delay } from '@support/util/delay';
import { ApiResType } from '@models/api/ApiResType';

type useFetchReturnType<T> = [T, boolean, Error | null, (url: string) => void, () => void];

type useFetchOptions<T> = {
  initData: T;
  useDelay?: boolean;
};

export default function useFetch<T>(
  fetchUrl: string,
  { initData, useDelay = false }: useFetchOptions<T>
): useFetchReturnType<T> {
  // 최초 로드를 자동으로 할경우 로딩 부터 시작되도록한다.
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<T>(initData);
  const [error, setError] = useState<Error | null>(null);

  const [url, setUrl] = useState<string>(fetchUrl);

  const onFetch = async () => {
    try {
      const result = await apiCall.get<ApiResType<T>>(url);

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
    setData(initData);
    setError(null);
  };

  return [data, isLoading, error, setUrl, onReset];
}
