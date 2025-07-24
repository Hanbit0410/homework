import React, { useState } from 'react';
import '../css/bookRent.css';
import BookRent02 from './BookRent02';

const users = ['김철수', '이영희'];

export default function BookRent() {
  const [selectedUser, setSelectedUser] = useState('');
  const [loggedInUser, setLoggedInUser] = useState('');
  const [userRentedBooks, setUserRentedBooks] = useState([]);
  const [globalRentedBooks, setGlobalRentedBooks] = useState([]);

  const handleLogin = () => {
    if (selectedUser) {
      setLoggedInUser(selectedUser);
      const userBooks = globalRentedBooks.filter(book => book.user === selectedUser && !book.returned);
      setUserRentedBooks(userBooks);
    }
  };

  const handleReturn = () => {
    const updatedGlobal = globalRentedBooks.map(book =>
      book.user === loggedInUser && book.selected
        ? { ...book, returned: true, selected: false }
        : book
    );
    setGlobalRentedBooks(updatedGlobal);

    const updatedUserBooks = userRentedBooks.filter(book => !book.selected);
    setUserRentedBooks(updatedUserBooks);
  };

  const addRentedBook = (bookName) => {
    const newBook = {
      name: bookName,
      returned: false,
      selected: false,
      user: loggedInUser
    };
    setUserRentedBooks(prev => [...prev, newBook]);
    setGlobalRentedBooks(prev => [...prev, newBook]);
  };

  const toggleSelect = (index) => {
    const updated = [...userRentedBooks];
    updated[index].selected = !updated[index].selected;
    setUserRentedBooks(updated);
  };

  return (
    <div className="container">
      <div className="login-section">
        <select onChange={(e) => setSelectedUser(e.target.value)} defaultValue="">
          <option value="">사용자 선택</option>
          {users.map(user => (
            <option key={user}>{user}</option>
          ))}
        </select>
        <button onClick={handleLogin}>로그인</button>
      </div>

      {loggedInUser && (
        <>
          <h3>대여한 도서 목록</h3>
          <div className="rent-list">
            {userRentedBooks.map((book, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  checked={book.selected || false}
                  onChange={() => toggleSelect(index)}
                />
                {book.name} <span>(대여 중)</span>
              </div>
            ))}
            <button onClick={handleReturn}>반납</button>
          </div>

          <BookRent02
            loggedInUser={loggedInUser}
            addRentedBook={addRentedBook}
            globalRentedBooks={globalRentedBooks}
          />
        </>
      )}
    </div>
  );
}