import "./Search.scss";

import { useMemo, useState } from "react";

import { HiMagnifyingGlass } from "react-icons/hi2";

import MovieCard from "../../components/cards/MovieCard/MovieCard";
import { moviesData } from "../../constants/moviesData";

function Search() {
  const [query, setQuery] = useState("");

  const filteredMovies = useMemo(() => {
    if (!query.trim()) return [];

    return moviesData.filter((movie) => {
      const search = query.toLowerCase();

      return (
        movie.title.toLowerCase().includes(search) ||
        movie.description.toLowerCase().includes(search) ||
        movie.genres?.some((genre) =>
          genre.toLowerCase().includes(search),
        ) ||
        movie.cast?.some((actor) =>
          (
            actor.name || actor
          )
            .toLowerCase()
            .includes(search),
        )
      );
    });
  }, [query]);

  return (
    <main className="search-page">

      <div className="container">

        <header className="search-page__header">

          <h1 className="search-page__title">
            Search
          </h1>

          <p className="search-page__subtitle">
            Find movies, actors and genres.
          </p>

        </header>

        <div className="search-page__search">

          <HiMagnifyingGlass />

          <input
            type="search"
            placeholder="Search movies..."
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
          />

        </div>

        {!query && (

          <section className="search-page__empty">

            <h2>Start Searching</h2>

            <p>
              Search for your favourite movies,
              actors or genres.
            </p>

          </section>

        )}

        {query && filteredMovies.length === 0 && (

          <section className="search-page__empty">

            <h2>No Results Found</h2>

            <p>
              Try another keyword.
            </p>

          </section>

        )}

        {filteredMovies.length > 0 && (

          <section className="search-page__results">

            {filteredMovies.map((movie) => (

              <MovieCard
                key={movie.id}
                movie={movie}
              />

            ))}

          </section>

        )}

      </div>

    </main>
  );
}

export default Search;