import React, { useReducer, useCallback, useState, ChangeEvent } from 'react';

type DefaultValues = {
  [key: string]: string;
};

type UseInputsAction = {
  name: string;
  value: string;
};

function reducer<T>(state: T, action: UseInputsAction | null) {
  if (!action) {
    const initialState: any = {};
    Object.keys(state).forEach((key) => {
      initialState[key] = '';
    });
    return initialState;
  }
  return {
    ...state,
    [action.name]: action.value
  };
}

export default function useInputs<T>(defaultValues: T) {
  const [inputs, setInputs] = useState(defaultValues);

  // 인풋 이벤트 변경
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput(name, value);
  }, []);

  const setInput = useCallback(<T>(name: string, value: T) => {
    setInputs((prevState) => {
      return {
        ...prevState,
        [name]: value
      };
    });
  }, []);

  const onClear = useCallback((e: React.MouseEvent<HTMLLIElement>) => {
    const type = e.currentTarget.dataset.type || '';
    // @ts-ignore
    setInput(type, defaultValues[type]);
  }, []);

  const onReset = useCallback(() => {
    setInputs(Object.assign({}, defaultValues));
  }, []);

  return {
    inputs,
    onChange,
    onClear,
    onReset,
    setInput,
    setInputs
  };
}
