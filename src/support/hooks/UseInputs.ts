import React, { useCallback, useState, ChangeEvent } from 'react';

export default function useInputs<T>(defaultValues: T) {
  const [inputs, setInputs] = useState(defaultValues);

  const setInput = useCallback(<T>(name: string, value: T) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }, [setInputs]);

  // 인풋 이벤트 변경
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(name, value);
  }, [setInput]);

  const onClear = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const type = e.currentTarget.dataset.type || '';
    // @ts-ignore
    setInput(type, defaultValues[type]);
  }, [defaultValues, setInput]);

  const onReset = useCallback(() => {
    setInputs(Object.assign({}, defaultValues));
  }, [setInputs, defaultValues]);

  return {
    inputs,
    onChange,
    onClear,
    onReset,
    setInput,
    setInputs
  };
}
