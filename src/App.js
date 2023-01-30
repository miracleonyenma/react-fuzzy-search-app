// ./src/App.js

import { useEffect, useState } from "react";
import Fuse from "fuse.js";

const bookTitles = [
  "Mercy's Birds",
  "The Last of the Mohicans",
  "Harry Potter and the Sorcerer's Stone",
  "The Hobbit",
  "The Lord of the Rings",
  "The Fellowship of the Ring",
  "The Two Towers",
  "The Sandman",
  "The Return of the King",
];

function App() {
  // search term
  const [searchTerm, setSearchTerm] = useState(" ");

  // options object for fuse.js
  const options = {
    includeScore: true,
  };

  // initialize fuse with list and options
  const fuse = new Fuse(bookTitles, options);

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
            <li className="result my-4">
              <h2>{result.item}</h2>
              <span>Score: {result.score}</span>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

export default App;
