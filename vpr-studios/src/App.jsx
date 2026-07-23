import { Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar/Navbar";

import Home from "./pages/Home/Home";
import Search from "./pages/Search/Search";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/search"
          element={<Search />}
        />
      </Routes>
    </>
  );
}

export default App;