## 컴포넌트 작성규칙


###  컴포넌트 및 컨테이너
1. 컴포넌트 상태와 의존성잉 없는 value 들은 컴포넌트 상단에 위치시킨다.
2. 컴포넌트 상태와 의존성이 없는 function 들은 컴포넌트 하단에 선언한다.

```js
import React, { useState } from 'react';

const options = {
  name: '이름'
};


function component({ a, b }) {
  const [ count, setCount ]= useState(0);
  return (
    <componentName>
      {options.name}
      {count}
      {double(count)}
      <button onClick={() => setCount(prev => prev + 1)} >버튼</button>
    </componentName>
  );
}

function double(number) {
  return number * 2;
}


export default component

```
