import React, {useState} from 'react';
import { useMemo } from 'react';

function UseMemoExam02(props) {
  const [numList, setNumList] = useState([]);
  const [num, setNum] = useState(0);


  /*useMemo는 함수가 실행한 결과 값을 메모리에 저장했다가, 
    의존성 배열에 명시된 값들이 변경되기 전까지는 다시 계산하지 않고 
    기존 값을 재사용하여 불필요한 연산을 줄이고 성능을 최적화하는 React 훅이다. 
    이 과정을 **메모리제이션(memoization)이라고 하며, 연산 비용이 큰 작업에서 유용하게 쓰인다. */
  
  /*비지니스 로직 중 계산된 결과를 반환하는 함수에서 그 연산이 복잡하거나, 오래 걸리는 함수에 useMemo를 사용해
    cpu 사용률이나 메모리 사용에 대한 최적화를 기대할 수 있음 */
    
  //평균값 구하기
  const avg = useMemo(()=>{
    console.log('==평균값 구하기==');
    if(numList.length === 0) return 0;

    console.log(numList);
    const sum = numList.reduce((sum, num) => sum + num);
    return(sum / numList.length).toFixed(2);
  }, [numList])
  
  const insertNum =()=>{
    setNumList((prev)=>[...prev, Number(num)])
    setNum('');
  }
  
  return (
    <div>
      <p>평균 값 : {avg} </p>
      <div>
        <label htmlFor='num'>입력 값 :</label>
        <input type='number' id='num' 
          value={num} onChange={(e)=> setNum(e.target.value)}/>
        <button type='button' onClick={insertNum}>등록</button>
      </div>
    </div>
  );
}

export default UseMemoExam02;