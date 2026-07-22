import Navbar from "./components/layout/Navbar/Navbar";
import Hero from "./components/sections/Hero/Hero";
import MovieRow from "./components/sections/MovieRow/MovieRow";

import { moviesData } from "./constants/moviesData";

function App() {
  return (
    <>
      <Navbar />
      <Hero />

      <MovieRow
        title="Trending Now"
        movies={moviesData}
      />
    </>
  );
}

export default App;