import React, { useState } from 'react';

export default function BookRent02({ loggedInUser, addRentedBook, globalRentedBooks }) {
  const [books, setBooks] = useState([]);
  const [newBookName, setNewBookName] = useState('');

  const isGloballyRented = (bookName) =>
    globalRentedBooks.some(book => book.name === bookName && !book.returned);

  const handleAddBook = () => {
    if (
      newBookName &&
      !books.some(book => book.name === newBookName)
    ) {
      setBooks([...books, { name: newBookName, rented: false, selected: false }]);
      setNewBookName('');
    }
  };

  const handleDelete = () => {
    const updated = books.filter(book => !book.selected);
    setBooks(updated);
  };

  const handleRent = () => {
    const updatedBooks = books.map(book => {
      if (book.selected && !isGloballyRented(book.name)) {
        addRentedBook(book.name);
        return { ...book, rented: true, selected: false };
      }
      return book;
    });
    setBooks(updatedBooks);
  };

  const toggleSelect = (index) => {
    const updated = [...books];
    updated[index].selected = !updated[index].selected;
    setBooks(updated);
  };

  return (
    <div className="book-section">
      <h3>도서 목록</h3>
      <input
        type="text"
        value={newBookName}
        onChange={(e) => setNewBookName(e.target.value)}
        placeholder="도서 이름 입력"
      />
      <button onClick={handleAddBook}>추가</button>
      <button onClick={handleRent}>대여</button>
      <button onClick={handleDelete}>삭제</button>

      <div className="book-list">
        {books.map((book, index) => (
          <div key={index}>
            <input
              type="checkbox"
              disabled={isGloballyRented(book.name)}
              checked={book.selected || false}
              onChange={() => toggleSelect(index)}
            />
            {book.name} {isGloballyRented(book.name) && <span>(대여 중)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}