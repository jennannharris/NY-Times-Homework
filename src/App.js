import logo from "./logo.svg";
import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [lists, setLists] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async () => {
      const listResponse = await fetch(
        "https://api.nytimes.com/svc/books/v3/lists/names.json?api-key=BJGyXHxkqTUg2GQg7mwmbeTPserVdIMg"
      );
      const listData = await listResponse.json();
      console.log(listData.results);
      setLists(listData.results);
    })();
  }, []);

  const listSelected = async (event) => {
    const selectedList = event.target.value;

    console.log(selectedList);

    const booksResponse = await fetch(
      `https://api.nytimes.com/svc/books/v3/lists/current/${selectedList}.json?api-key=U0cvhxYAn91ZOvu6NABVl7wlEGKRpVMT`
    );
    const booksData = await booksResponse.json();
    setBooks(booksData.results.books);
  };

  return (
    <div className="App">
      <select onChange={listSelected}>
        <option></option>

        {lists.map((list) => {
          return (
            <option
              value={list.list_name_encoded}
              key={list.list_name_encoded}
            >
              {list.display_name}
            </option>
          );
        })}
      </select>
      <ul>
        {books.map((book) => {
          // console.log(book);
          return (
            <li>
              {book.title} - {book.author}
              <br />
              <img src={book.book_image} style={{ maxWidth: 80 }} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default App;
