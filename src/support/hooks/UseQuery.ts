import { useLocation } from 'react-router';

interface LooseObject {
  [key: string]: any;
}

export function useQuery(keys: string[]) {
  const result: LooseObject = {};
  const query = new URLSearchParams(useLocation().search);

  keys.forEach((key) => {
    result[key] = query.get(key);
  });

  return result;
}
