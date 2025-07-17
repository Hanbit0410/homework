import React, { useCallback, useEffect, useState } from 'react';

function UseCallbackExam02(props) {

  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);

  const upCount1 = ()=>{
    setCount1(count1+1);
  }

  const upCount2 = ()=>{
    setCount2(count2+1);
  }

  const printCount1 = useCallback(() =>{
    console.log(count1);
  },[count1]);

    const printCount2 = useCallback(() =>{
    console.log(count2);
  },[count2]);

  useEffect(()=>{
    console.log('print 함수1 실행')
  },[printCount1]);

  useEffect(()=>{
    console.log('print 함수2 실행')
  },[printCount2]);

  return (
    <div>
      <p>카운트1 : {count1}</p>
      <p>카운트2 : {count2}</p>
      <div>
        <button type='button' onClick={upCount1}>증가1</button>
        <button type='button' onClick={upCount2}>증가2</button>
      </div>
    </div>
  );
}

export default UseCallbackExam02;