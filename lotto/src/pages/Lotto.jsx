import React, { useState, useRef } from 'react';
import '../assets/css/lotto.css';

const LottoNumbers = () => {
  const nums = new Set();
  while (nums.size < 6) {
    nums.add(Math.floor(Math.random() * 45) + 1);
  }
  return [...nums].sort((a, b) => a - b);
};

const getRank = (userNums, systemNums, bonusNum) => {
  const matchCount = userNums.filter((num) => systemNums.includes(num)).length;
  const hasBonus = userNums.includes(bonusNum);

  switch (matchCount) {
    case 6:
      return '1등';
    case 5:
      return hasBonus ? '2등' : '3등';
    case 4:
      return '4등';
    case 3:
      return '5등';
    default:
      return '꽝';
  }
};

const Lotto = () => {
  const [systemNums, setSystemNums] = useState(LottoNumbers());
  const [bonusNum, setBonusNum] = useState(() => {
    let n;
    do {
      n = Math.floor(Math.random() * 45) + 1;
    } while (systemNums.includes(n));
    return n;
  });

  const [userLottos, setUserLottos] = useState([]);
  const [tryCount, setTryCount] = useState(0);
  const [running, setrunning] = useState(false);

  const attemptRef = useRef(null);
  const runningRef = useRef(false);

  const person = () => {
    const newLottos = Array.from({ length: 5 }, () => LottoNumbers());
    setUserLottos(newLottos);
    setTryCount(0);
    setrunning(false);
    runningRef.current = false;
  };

  const pc = () => {
    const newSystem = LottoNumbers();
    let newBonus;
    do {
      newBonus = Math.floor(Math.random() * 45) + 1;
    } while (newSystem.includes(newBonus));

    setSystemNums(newSystem);
    setBonusNum(newBonus);
    setUserLottos([]);
    setTryCount(0);
    setrunning(false);
    runningRef.current = false;
  };

  const stopAutoDraw = () => {
    clearTimeout(attemptRef.current);
    setrunning(false);
    runningRef.current = false;
    setTryCount(0);
    setUserLottos([]);
  };

  const autoTopRank = () => {
    pc();
    setTryCount(0);
    setUserLottos([]);
    setrunning(true);
    runningRef.current = true;

    let tries = 0;

    const attempt = () => {
      if (!runningRef.current) return;

      const newLottos = Array.from({ length: 5 }, () => LottoNumbers());
      const topLottos = newLottos.filter((user) => {
        const rank = getRank(user, systemNums, bonusNum);
        return rank === '1등' || rank === '2등';
      });

      tries++;
      setTryCount(tries);

      if (topLottos.length > 0) {
        setUserLottos(topLottos);
        setrunning(false);
        runningRef.current = false;
        return;
      }

      attemptRef.current = setTimeout(attempt, 10);
    };

    attempt();
  };

  return (
    <div className="container">
      <h2>SYSTEM 생성 번호</h2>
      <div className="number-row">
        {systemNums.map((num, idx) => (
          <div key={idx} className="lotto-number system">{num}</div>
        ))}
        <div className="lotto-number bonus">{bonusNum}</div>
      </div>

      <button onClick={person} disabled={running}>유저 로또 생성</button>
      <button onClick={pc} disabled={running}>시스템 로또 생성</button>
      <button onClick={autoTopRank} disabled={running}>1~2등 나올 때까지 추첨🙏</button>
      {running && <button onClick={stopAutoDraw}>추첨 멈춤🛑</button>}

      {running && (
        <div className="try-count">
          <strong>추첨 중:</strong> {tryCount}회 진행 중...
        </div>
      )}

      {!running && tryCount > 0 && (
        <div className="try-count">
          <strong>총 추첨 시도 횟수:</strong> {tryCount}회
        </div>
      )}

      <h2>유저 생성 번호</h2>
      {userLottos.map((user, i) => {
        const rank = getRank(user, systemNums, bonusNum);
        return (
          <div key={i} className="user-row">
            <div className="number-row">
              {user.map((num, idx) => {
                let className = 'lotto-number';
                if (num === bonusNum) className += ' bonus-match';
                else if (systemNums.includes(num)) className += ' match';
                return (
                  <div key={idx} className={className}>{num}</div>
                );
              })}
            </div>
            <span className="rank">{rank}</span>
          </div>
        );
      })}
    </div>
  );
};

export default Lotto;