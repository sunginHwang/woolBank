import { EffectCallback, useEffect } from 'react';

/**
 * mount 생명주기
 * */
export default function useMount(effect: EffectCallback) {
  useEffect(() => {
    effect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
