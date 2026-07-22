import "./MovieRow.scss";
import {
  useRef,
  useState,
  useEffect,
  useCallback,
} from "react";
import {
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi2";

import MovieCard from "../../cards/MovieCard/MovieCard";

function MovieRow({
  title = "",
  movies = [],
  onMovieSelect,
}) {
  const sliderRef = useRef(null);

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const [isScrolling, setIsScrolling] = useState(false);

  if (!movies.length) return null;

  const getScrollDistance = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return 0;

    const card = slider.querySelector(".movie-card");

    if (!card) return 0;

    const gap =
      parseFloat(getComputedStyle(slider).gap) || 0;

    let visibleCards = 5;

    if (window.innerWidth <= 992) visibleCards = 4;

    if (window.innerWidth <= 768) visibleCards = 3;

    return (card.offsetWidth + gap) * visibleCards;
  }, []);

  const updateArrows = useCallback(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const maxScroll =
      slider.scrollWidth - slider.clientWidth;

    setShowLeftArrow(slider.scrollLeft > 5);

    setShowRightArrow(
      slider.scrollLeft < maxScroll - 5,
    );
  }, []);

  const scrollSlider = useCallback(
    (direction) => {
      if (isScrolling) return;

      const slider = sliderRef.current;

      if (!slider) return;

      setIsScrolling(true);

      slider.scrollBy({
        left: direction * getScrollDistance(),
        behavior: "smooth",
      });

      window.setTimeout(() => {
        setIsScrolling(false);
        updateArrows();
      }, 450);
    },
    [getScrollDistance, isScrolling, updateArrows],
  );

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    updateArrows();

    slider.addEventListener("scroll", updateArrows);

    const resizeObserver = new ResizeObserver(() => {
      updateArrows();
    });

    resizeObserver.observe(slider);

    return () => {
      slider.removeEventListener(
        "scroll",
        updateArrows,
      );

      resizeObserver.disconnect();
    };
  }, [updateArrows]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleKeyDown = (event) => {
      switch (event.key) {
        case "ArrowLeft":
          event.preventDefault();
          scrollSlider(-1);
          break;

        case "ArrowRight":
          event.preventDefault();
          scrollSlider(1);
          break;

        case "Home":
          event.preventDefault();

          slider.scrollTo({
            left: 0,
            behavior: "smooth",
          });

          break;

        case "End":
          event.preventDefault();

          slider.scrollTo({
            left: slider.scrollWidth,
            behavior: "smooth",
          });

          break;

        default:
          break;
      }
    };

    slider.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () =>
      slider.removeEventListener(
        "keydown",
        handleKeyDown,
      );
  }, [scrollSlider]);

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) return;

    const handleWheel = (event) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX))
        return;

      event.preventDefault();

      slider.scrollBy({
        left: event.deltaY,
      });
    };

    slider.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () =>
      slider.removeEventListener(
        "wheel",
        handleWheel,
      );
  }, []);

  return (
    <section
      className="movie-row"
      aria-labelledby={`row-${title}`}
    >
      <div className="container">
        <div className="movie-row__header">
          <h2
            id={`row-${title}`}
            className="movie-row__title"
          >
            {title}
          </h2>
        </div>

        <div className="movie-row__wrapper">
          {showLeftArrow && (
            <button
              type="button"
              className="movie-row__arrow movie-row__arrow--left"
              onClick={() => scrollSlider(-1)}
              disabled={isScrolling}
              aria-label="Scroll movies left"
            >
              <HiChevronLeft />
            </button>
          )}

          <div
            ref={sliderRef}
            className="movie-row__slider"
            tabIndex={0}
          >
            {movies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                onClick={onMovieSelect}
              />
            ))}
          </div>

          {showRightArrow && (
            <button
              type="button"
              className="movie-row__arrow movie-row__arrow--right"
              onClick={() => scrollSlider(1)}
              disabled={isScrolling}
              aria-label="Scroll movies right"
            >
              <HiChevronRight />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default MovieRow;