import "./Hero.scss";
import { HiChevronLeft, HiChevronRight, HiPlay, HiPlus } from "react-icons/hi2";
import { heroData } from "../../../constants/heroData";
import { useState, useEffect, useRef } from "react";

function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const currentMovie = heroData[currentSlide];
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === heroData.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? heroData.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, isPaused]);

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
  }, []);

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchMove = (event) => {
    touchEndX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartX.current - touchEndX.current;

    // Swipe Left
    if (distance > 70) {
      nextSlide();
    }

    // Swipe Right
    if (distance < -70) {
      prevSlide();
    }
  };

  useEffect(() => {
    heroData.forEach((movie) => {
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
        style={{
          backgroundImage: `url(${currentMovie.image})`,
        }}
      ></div>
      <div className="hero__overlay" />
      {/* Content */}
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__content" aria-live="polite">
            <div className="hero__meta">
              <span className="hero__meta-item">⭐ {currentMovie.rating}</span>

              <span className="hero__meta-item">{currentMovie.year}</span>

              <span className="hero__meta-item">{currentMovie.genre}</span>
            </div>

            <h1 className="hero__title">{currentMovie.title}</h1>

            <p className="hero__description">{currentMovie.description}</p>

            <div className="hero__actions">
              <button className="hero__primary-btn">
                <HiPlay />
                <span>Watch Now</span>
              </button>

              <button className="hero__secondary-btn">
                <HiPlus />
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Controls */}
      <div className="hero__controls">
        <button
          className="hero__control-btn"
          aria-label="Previous Slide"
          onClick={prevSlide}
        >
          <HiChevronLeft />
        </button>

        <button
          className="hero__control-btn"
          aria-label="Next Slide"
          onClick={nextSlide}
        >
          <HiChevronRight />
        </button>
      </div>
      {/* Dots */}
      <div className="hero__dots">
        {heroData.map((_, index) => (
          <button
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
