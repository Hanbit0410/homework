import React, { useCallback, useState } from 'react';
import ChildComponents from './ChildComponents';

function UseCallbackExam03(props) {

  const [count, setCount] = useState(0);
  const [name, setName] = useState('철수철수킴');

  const upCount = ()=>{
    setCount(count+1);
  }

  const changeName = useCallback(()=>{
    setName( name === '철수철수킴' ?'영희영희리' : '철수철수킴' );
  },[name]);

  return (
    <div>
      <p>카운트1 : {count}</p>
      <button type='button' onClick={upCount}>증가</button>
      <button type='button' onClick={changeName}>이름변경</button>
      <div>
        <ChildComponents name={name} event = {changeName}/>
      </div>
    </div>
  );
}

export default UseCallbackExam03;