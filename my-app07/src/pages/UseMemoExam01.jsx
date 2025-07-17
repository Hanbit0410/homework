import React, {useState} from 'react';

function UseMemoExam01(props) {
  const [numList, setNumList] = useState([]);
  const [num, setNum] = useState(0);
  const [avg, setAvg] = useState(0.0);

  //평균값 구하기
  const getAverage = ()=>{
    console.log('==평균값 구하기==');
    if(numList.length === 0) return 0;

    console.log(numList);
    const sum = numList.reduce((sum, num) => sum + num);
    return(sum / numList.length).toFixed(2);
  }
  
  const insertNum =()=>{
    setNumList((prev)=>[...prev, Number(num)])
    setNum('');
  }
  
  return (
    <div>
      <p>평균 값 : {getAverage()} </p>
      <div>
        <label htmlFor='num'>입력 값 :</label>
        <input type='number' id='num' 
          value={num} onChange={(e)=> setNum(e.target.value)}/>
        <button type='button' onClick={insertNum}>등록</button>
      </div>
    </div>
  );
}

export default UseMemoExam01;