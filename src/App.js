// ./src/App.js

import { useEffect, useState } from "react";
import Search from "./components/Search";

// function to fetch posts
const fetchPosts = async () => {
  try {
    const res = await fetch("https://dummyjson.com/posts");
    const data = await res.json();
    return data.posts;
  } catch (error) {
    console.log({ error });
    return error;
  }
};

function App() {
  // posts state
  const [posts, setPosts] = useState([]);

  // results state
  const [results, setResults] = useState([]);

  // fetch posts
  const getPosts = async () => {
    const posts = await fetchPosts();
    console.log({ posts });
    setPosts(posts);
  };

  // update results from search component
  const handleUpdateResults = (results) => {
    // console.log({ results });
    setResults(results);
  };

  // fetch posts on mount
  useEffect(() => {
    getPosts();
  }, []);

  const highlightText = (text, matches) => {
    console.log({ text, matches });
    // matches is an array of arrays
    // each array contains the start and end index of the match
    // e.g. [[0, 3], [5, 8]]
    // we need to split the text into an array of spans
    // where each span contains the text and a class
    // to highlight the text
    // e.g. [<span className="highlight">foo</span>, " ", <span className="highlight">bar</span>]
    // we can then render the array of spans
    // e.g. <span className="highlight">foo</span> <span className="highlight">bar</span>
    const spans = [];
    let lastIndex = 0;
    matches?.forEach((match) => {
      // add the text before the match
      spans.push(text.slice(lastIndex, match[0]));
      // add the match
      spans.push(
        <span
          key={match}
          className="highlight bg-sky-500 text-sky-50 px-1 rounded"
        >
          {text.slice(match[0], match[1] + 1)}
        </span>
      );
      // update the last index
      lastIndex = match[1] + 1;
    });
    // add the text after the last match
    spans.push(text.slice(lastIndex));
    return spans;
  };

  return (
    <main className="p-4 max-w-4xl m-auto">
      <header>
        <div className="wrapper">
          <h1 className="text-4xl mb-4">Posts</h1>
          <Search list={posts} updateResults={handleUpdateResults} />
        </div>
      </header>

      <ul className="results flex flex-col gap-6 my-8">
        {results.length > 0 ? (
          results.map((post) => (
            <li key={post.item.id}>
              <h2 className="text-2xl">
                {highlightText(
                  post.item.title,
                  post.matches.find((match) => match.key === "title")?.indices
                )}
              </h2>
              <p>{post.item.body}</p>
              <ul className="tags flex gap-2">
                {post.item.tags.map((tag) => (
                  <li key={tag} className="tag bg-slate-50 p-2">
                    {highlightText(
                      tag,
                      post.matches.find(
                        (match) => match.key === "tags" && match.value === tag
                      )?.indices
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))
        ) : (
          <li>No results</li>
        )}
      </ul>
    </main>
  );
}

export default App;
