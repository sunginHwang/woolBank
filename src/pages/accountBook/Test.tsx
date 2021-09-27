import { Input } from '@/components/atoms/Input';
import PageTemplate from '@/components/layout/PageTemplate';
import React, { useRef, useState } from 'react';

function Test() {
  const ref = useRef<HTMLInputElement>(null);
  const [input, setinput] = useState('');

  console.log('onMount');
  return (
    <PageTemplate>
      <Input ref={ref} label='ref 데이터' defaultValue='12' />
      <Input value={input} onChange={(e) => setinput(e.target.value)} />
    </PageTemplate>
  );
}

export default Test;
