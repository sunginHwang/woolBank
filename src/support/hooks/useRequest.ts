import { useState } from 'react';
import { AxiosPromise } from 'axios';

type PromiseCreator<T> = (...params: any[]) => AxiosPromise<T>;

type onRequestType = {
  params: any;
  callbackFunc?: Function;
};

type UseRequestReturnType<T> = [
  ({ params, callbackFunc }: onRequestType) => void,
  boolean,
  Error | null,
  T | null,
  () => void
];

export default function useRequest<T>(axiosRequest: PromiseCreator<T>): UseRequestReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onRequest = async ({ params, callbackFunc }: onRequestType) => {
    try {
      setLoading(true);
      let response = null;

      if(Array.isArray(params)){
        response = await axiosRequest(...params);
      }else {
        response = await axiosRequest(params);
      }

      if (callbackFunc && typeof callbackFunc === 'function') {
        await callbackFunc(response.data);
      }

      setData(response.data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [onRequest, loading, error, data, onReset];
}
