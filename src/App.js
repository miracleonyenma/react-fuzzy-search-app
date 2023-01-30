// ./src/App.js

import { useState } from "react";
import Fuse from "fuse.js";

const books = [
  {
    title: "Mercy's Birds",
    author: "Linda Holeman",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "romance",
      },
    ],
  },
  {
    title: "The Last of the Mohicans",
    author: "James Fenimore Cooper",
    genre: "Historical Fiction",
    tags: [
      {
        name: "historical",
      },
      {
        name: "adventure",
      },
    ],
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "magic",
      },
    ],
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "adventure",
      },
    ],
  },
  {
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "adventure",
      },
      {
        name: "epic",
      },
    ],
  },
  {
    title: "The Fellowship of the Ring",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "adventure",
      },
      {
        name: "epic",
      },
    ],
  },
  {
    title: "The Two Towers",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "adventure",
      },
      {
        name: "epic",
      },
    ],
  },
  {
    title: "The Sandman",
    author: "Neil Gaiman",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "graphic novel",
      },
      {
        name: "horror",
      },
    ],
  },
  {
    title: "The Return of the King",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    tags: [
      {
        name: "fantasy",
      },
      {
        name: "adventure",
      },
      {
        name: "epic",
      },
    ],
  },
];

function App() {
  // search term
  const [searchTerm, setSearchTerm] = useState(" ");

  // options object for fuse.js
  const options = {
    includeScore: true,
    keys: [
      { name: "title", weight: 1 },
      { name: "author", weight: 2 },
      { name: "genre", weight: 3 },
      { name: "tags.name", weight: 4 },
    ],
  };

  // initialize fuse with list and options
  const fuse = new Fuse(books, options);

  // search based on search term entered
  const searchResults = fuse.search(searchTerm);

  // function to update search term from input element
  const handleSearch = ({ currentTarget }) => {
    const { value } = currentTarget;
    setSearchTerm(value);
  };

  return (
    <main>
      <div className="p-4">
        <input
          value={searchTerm}
          onChange={handleSearch}
          type="text"
          placeholder="Search"
          className="bg-slate-200 p-2 rounded"
        />

        <ul className="results">
          {searchResults.map((result) => (
            <li key={result.refIndex} className="result my-4">
              <h2>{result.item.title}</h2>
              <p> {} </p>
              <span>Score: {result.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
