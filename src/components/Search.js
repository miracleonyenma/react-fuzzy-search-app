// ./src/components/Search.js

import { useEffect, useState } from "react";
import Fuse from "fuse.js";
import { useMemo } from "react";

const Search = ({ list, updateResults }) => {
  // search term
  const [searchTerm, setSearchTerm] = useState(" ");

  // options object for fuse.js
  const options = {
    includeScore: true,
    keys: ["title", "tags"],
    includeMatches: true,
  };

  // initialize fuse with list and options
  const fuse = new Fuse(list, options);

  // search based on search term entered
  const searchResults = useMemo(() => {
    return fuse.search(searchTerm);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm]);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // update results when search term changes
  useEffect(() => {
    updateResults(searchResults);
  }, [searchResults, updateResults]);

  return (
    <div className="search">
      <input
        value={searchTerm}
        onChange={handleChange}
        type="text"
        placeholder="Search by title or tag"
        className="p-2 border border-gray-300 rounded-md"
      />
    </div>
  );
};

export default Search;
