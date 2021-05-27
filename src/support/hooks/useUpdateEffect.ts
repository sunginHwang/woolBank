import { DependencyList, EffectCallback, useEffect, useRef } from 'react';

/**
 * dependencies 의 변화가 있을경우만 실행되는 effect hook 함수 (mounted 시점에서는 동작 x)
 * @example
 * useUpdateEffect(() => {}, [dependencies]);
 */

export default function useUpdateEffect(effect: EffectCallback, dependencies: DependencyList) {
  const didMountRef = useRef(true);

  useEffect(() => {
    if (didMountRef.current) {
      didMountRef.current = false;
    } else {
      effect();
    }
  }, dependencies);
}
