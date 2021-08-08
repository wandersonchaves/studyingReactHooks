import React, { useState, useEffect } from "react";

export default function App() {
  const [repositories, setRepositories] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const res = await fetch(
      "https://api.github.com/users/wandersonchaves/repos"
    );
    const data = await res.json();

    setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });

    setRepositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name} {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}
