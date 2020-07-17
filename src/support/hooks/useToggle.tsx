import { useCallback, useState } from 'react';

export function useToggle(value: boolean = false) {
  const [toggle, setToggle] = useState(value);

  const onTrue = useCallback(() => setToggle(true), []);
  const onFalse = useCallback(() => setToggle(false), []);
  const onToggle = useCallback(() => setToggle((prevToggle) => !prevToggle), []);

  return [toggle, onTrue, onFalse, onToggle] as [
    boolean,
    typeof onTrue,
    typeof onFalse,
    typeof onToggle
  ];
}
