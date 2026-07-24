import "./Hero.scss";
import {
  HiChevronLeft,
  HiChevronRight,
  HiPlay,
  HiPlus,
  HiSpeakerWave,
  HiSpeakerXMark,
  HiInformationCircle,
} from "react-icons/hi2";
import { moviesData } from "../../../constants/moviesData";
import { useState, useEffect, useRef, useCallback } from "react";


function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const currentMovie = moviesData[currentSlide];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

 const nextSlide = useCallback(() => {
  setCurrentSlide((prev) =>
    prev === moviesData.length - 1 ? 0 : prev + 1
  );
}, []);

const prevSlide = useCallback(() => {
  setCurrentSlide((prev) =>
    prev === 0 ? moviesData.length - 1 : prev - 1
  );
}, []);

  useEffect(() => {
  if (isPaused) return;

  const interval = setInterval(nextSlide, 5000);

  return () => clearInterval(interval);
}, [isPaused, nextSlide]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "ArrowLeft") {
        prevSlide();
      }

      if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextSlide, prevSlide]);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;
const SWIPE_THRESHOLD = 70;
    // Swipe Left
    if (distance > SWIPE_THRESHOLD) {
      nextSlide();
    }

    // Swipe Right
    if (distance < -SWIPE_THRESHOLD) {
      prevSlide();
    }
  };

  useEffect(() => {
    moviesData.forEach((movie) => {
      const img = new Image();
      img.src = movie.image;
    });
  }, []);
  return (
    <section
      className="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background */}
      <div
        className="hero__background"
        aria-hidden="true"
        style={{
          backgroundImage: `url(${currentMovie.image})`,
        }}
      ></div>
      <div className="hero__overlay" aria-hidden="true" />
      {/* Content */}
      <div className="container">
        <div className="hero__wrapper" aria-label="Featured Movie">
          <div className="hero__content" aria-live="polite">
            <div className="hero__meta">
              <span className="hero__badge">{currentMovie.maturityRating}</span>

              <span className="hero__meta-item">⭐ {currentMovie.rating}</span>

              <span className="hero__meta-item">{currentMovie.year}</span>

              <span className="hero__meta-item">{currentMovie.duration}</span>

              <span className="hero__badge">{currentMovie.quality}</span>
            </div>

            <h1 className="hero__title">{currentMovie.title}</h1>
            {currentMovie.tagline && (
              <p className="hero__tagline">{currentMovie.tagline}</p>
            )}

            <p className="hero__description">{currentMovie.description}</p>
            <p className="hero__genres">{currentMovie.genres.join(" • ")}</p>

            <div className="hero__actions">
              <button type="button" className="hero__primary-btn">
                <HiPlay />

                <span>Play</span>
              </button>

              <button type="button" className="hero__secondary-btn">
                <HiInformationCircle />

                <span>More Info</span>
              </button>

              <button
                type="button"
                className="hero__icon-btn"
                aria-label="Add to My List"
                className="hero__icon-btn"
              >
                <HiPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="hero__controls">
        <button
          type="button"
          className="hero__control-btn"
          aria-label="Previous Slide"
          onClick={prevSlide}
        >
          <HiChevronLeft />
        </button>

        <button
          type="button"
          className="hero__control-btn"
          aria-label="Next Slide"
          onClick={nextSlide}
        >
          <HiChevronRight />
        </button>
      </div>
      <button
        type="button"
        className="hero__sound-btn"
        onClick={() => setIsMuted(!isMuted)}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {isMuted ? <HiSpeakerXMark /> : <HiSpeakerWave />}
      </button>
      {/* Dots */}
      <div className="hero__dots">
        {moviesData.map((_, index) => (
          <button
            type="button"
            key={index}
            className={
              index === currentSlide
                ? "hero__dot hero__dot--active"
                : "hero__dot"
            }
            aria-label={`Go to slide ${index + 1}`}
            aria-current={index === currentSlide ? "true" : undefined}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  );
}

export default Hero;
