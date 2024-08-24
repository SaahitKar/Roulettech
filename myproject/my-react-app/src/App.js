import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState({
    title: "",
    author: "",
    genre: ""
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/books/");
      setBooks(response.data);
    } catch (error) {
      console.error("There was an error fetching the books!", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://127.0.0.1:8000/api/books/", newBook);
      setNewBook({ title: "", author: "", genre: "" });
      fetchBooks(); // Refresh book list after adding a new book
    } catch (error) {
      console.error("There was an error adding the book!", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBook((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h1>Book List</h1>
      <ul>
        {books.map((book) => (
          <li key={book.id}>{book.title} by {book.author} - {book.genre}</li>
        ))}
      </ul>
      <h2>Add a new book</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="title" placeholder="Title" value={newBook.title} onChange={handleChange} required />
        <input type="text" name="author" placeholder="Author" value={newBook.author} onChange={handleChange} required />
        <input type="text" name="genre" placeholder="Genre" value={newBook.genre} onChange={handleChange} required />
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
}

export default App;
