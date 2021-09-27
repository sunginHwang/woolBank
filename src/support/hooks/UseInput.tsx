import React, { useState, useCallback } from 'react';

export default function useInput(
  defaultValue: string
): [string, (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, () => void] {
  const [input, setInput] = useState(defaultValue);
  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  }, []);
  const onReset = useCallback(() => setInput(''), []);
  return [input, onChange, onReset];
}
