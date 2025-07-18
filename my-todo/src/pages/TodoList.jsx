import React, { useState } from 'react';
import '../assets/css/todolist.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    const text = inputValue.trim();
    if (text) {
      setTodos([...todos, { text, done: false, selected: false }]);
      setInputValue('');
    }
  };

  const updateStatus = () => {
    const pending = todos.filter(t => !t.done).length;
    const done = todos.filter(t => t.done).length;
    const rate = todos.length ? Math.round((done / todos.length) * 100) : 0;
    return { pending, done, rate };
  };

  const handleSelect = (index, checked) => {
    const newTodos = [...todos];
    newTodos[index].selected = checked;
    setTodos(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].done = true;
    setTodos(newTodos);
  };

  const deleteTodo = index => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const selectAll = () => {
    setTodos(todos.map(t => ({ ...t, selected: true })));
  };

  const completeSelected = () => {
    setTodos(todos.map(t => t.selected ? { ...t, done: true } : t));
  };

  const deleteSelected = () => {
    setTodos(todos.filter(t => !t.selected));
  };

  const { pending, done, rate } = updateStatus();

  return (
    <div className="app">
      <h1>TodoList</h1>

      <div className="status">
        할 일: <span>{pending}</span> / 
        완료: <span>{done}</span> / 
        달성률: <span>{rate}%</span>
      </div>

      <div className="input-a">
        <input
          type="text"
          value={inputValue}
          placeholder="할 일을 입력하세요"
          onChange={e => setInputValue(e.target.value)}
        />
        <button onClick={addTodo}>등록</button>
      </div>

      <div className="total">
        <button onClick={selectAll}>일괄 선택</button>
        <button onClick={completeSelected}>일괄 완료</button>
        <button onClick={deleteSelected}>일괄 삭제</button>
      </div>

      <div id="todo-list">
        {todos.map((todo, index) => (
          <div key={index} className={`todo${todo.done ? ' completed' : ''}`}>
            <input
              type="checkbox"
              checked={todo.selected}
              onChange={e => handleSelect(index, e.target.checked)}
            />
            <span>{todo.text}</span>
            <button className="complete-btn" onClick={() => completeTodo(index)}>완료</button>
            <button className="delete-btn" onClick={() => deleteTodo(index)}>삭제</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;