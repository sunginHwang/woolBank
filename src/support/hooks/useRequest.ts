import { useState } from 'react';
import { AxiosPromise } from 'axios';

type PromiseCreator<T> = (...params: any[]) => AxiosPromise<T>;

type onRequestType = {
  params: any;
  onSuccess?: Function;
  onError?: Function;
  onFinally?: Function;
};

type UseRequestReturnType<T> = [
  (requestType: onRequestType) => void,
  boolean,
  Error | null,
  T | null,
  () => void
];

export default function useRequest<T>(axiosRequest: PromiseCreator<T>): UseRequestReturnType<T> {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const onRequest = async ({ params, onSuccess, onError, onFinally }: onRequestType) => {
    try {
      setLoading(true);
      let response = null;

      if (Array.isArray(params)) {
        response = await axiosRequest(...params);
      } else {
        response = await axiosRequest(params);
      }

      if (onSuccess && typeof onSuccess === 'function') {
        await onSuccess(response.data);
      }

      setData(response.data);
    } catch (e) {
      setError(e);

      if (onError && typeof onError === 'function') {
        await onError(e);
      }
    } finally {
      setLoading(false);
      if (onFinally && typeof onFinally === 'function') {
        onFinally();
      }
    }
  };

  const onReset = () => {
    setLoading(false);
    setData(null);
    setError(null);
  };

  return [onRequest, loading, error, data, onReset];
}
