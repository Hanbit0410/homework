import React, { useState } from 'react';
import '../assets/css/cardgame.css';

const CardGame = () => {
  const [cards, setCards] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [pcCards, setPcCards] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [result, setResult] = useState('');

  const generateUniqueNumbers = (count, max) => {
    const numbers = [];
    while (numbers.length < count) {
      const num = Math.floor(Math.random() * max) + 1;
      if (!numbers.includes(num)) numbers.push(num);
    }
    return numbers;
  };

  const handleStart = () => {
    const newCards = generateUniqueNumbers(5, 20);
    const pc = generateUniqueNumbers(2, 20);
    setCards(newCards);
    setPcCards(pc);
    setGameStarted(true);
    setSelectedCards([]);
    setResult('');
  };

  const handleSelect = () => {
    const userSum = selectedCards.reduce((a, b) => a + b, 0);
    const pcSum = pcCards.reduce((a, b) => a + b, 0);
    const winner = userSum > pcSum ? '사용자 승!' : userSum < pcSum ? 'PC 승!' : '무승부!';
    setResult(`사용자: ${userSum}, PC: ${pcSum} → ${winner}`);
  };

  const handleReset = () => {
    setCards([]);
    setPcCards([]);
    setSelectedCards([]);
    setGameStarted(false);
    setResult('');
  };

  const toggleCard = (num) => {
    if (selectedCards.includes(num)) {
      setSelectedCards(selectedCards.filter((n) => n !== num));
    } else {
      if (selectedCards.length < 2) setSelectedCards([...selectedCards, num]);
    }
  };

  return (
    <div className="game-container">
      <h3>카드 선택 (5장 중 2장 선택)</h3>
      <div className="card-grid">
        {cards.map((num) => (
          <label
            key={num}
            className={`card ${selectedCards.includes(num) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              className="card-checkbox"
              checked={selectedCards.includes(num)}
              disabled={!gameStarted}
              onChange={() => toggleCard(num)}
            />
            {num}
          </label>
        ))}
      </div>

      <div className="button-area">
        <button onClick={handleStart} disabled={gameStarted}>시작</button>
        <button
          onClick={handleSelect}
          disabled={!gameStarted || selectedCards.length !== 2}
        >
          선택
        </button>
        <button onClick={handleReset}>리셋</button>
      </div>

      <div className="result-area">
        <h4>{result}</h4>
      </div>
    </div>
  );
};

export default CardGame;