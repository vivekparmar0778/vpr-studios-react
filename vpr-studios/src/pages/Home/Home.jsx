import { useState } from "react";

import Hero from "../../components/sections/Hero/Hero";
import MovieRow from "../../components/sections/MovieRow/MovieRow";
import Footer from "../../components/layout/Footer/Footer";
import MovieModal from "../../components/ui/MovieModal/MovieModal";

import { moviesData } from "../../constants/moviesData";

function Home() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const openMovieModal = (movie) => {
    setSelectedMovie(movie);
  };

  const closeMovieModal = () => {
    setSelectedMovie(null);
  };

  return (
    <>
      <Hero />

      <MovieRow
        title="Trending Now"
        movies={moviesData}
        onMovieSelect={openMovieModal}
      />

      <MovieModal
        movie={selectedMovie}
        isOpen={Boolean(selectedMovie)}
        onClose={closeMovieModal}
      />

      <Footer />
    </>
  );
}

export default Home;