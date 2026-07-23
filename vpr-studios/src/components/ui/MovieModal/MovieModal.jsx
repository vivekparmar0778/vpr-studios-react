import "./MovieModal.scss";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { HiOutlinePlay, HiOutlinePlus, HiOutlineXMark } from "react-icons/hi2";

function MovieModal({ movie, isOpen, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    dialogRef.current?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;

      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !movie) return null;

  return createPortal(
    <div className="movie-modal" onClick={onClose}>
      <div
        className="movie-modal__dialog"
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="movie-modal-title"
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="movie-modal__close"
          type="button"
          aria-label="Close Movie Details"
          onClick={onClose}
        >
          <HiOutlineXMark />
        </button>

        <div className="movie-modal__hero">
          <img
            className="movie-modal__backdrop"
            src={movie.backdrop}
            alt={movie.title}
          />

          <div className="movie-modal__overlay" />

          <div className="movie-modal__hero-content">
            <h2 id="movie-modal-title" className="movie-modal__title">
              {movie.title}
            </h2>

            <div className="movie-modal__actions">
              <button type="button" className="movie-modal__play">
                <HiOutlinePlay />
                <span>Play</span>
              </button>

              <button type="button" className="movie-modal__list">
                <HiOutlinePlus />
                <span>My List</span>
              </button>
            </div>
          </div>
        </div>

        <div className="movie-modal__body">
          <div className="movie-modal__info">
            <span className="movie-modal__rating">⭐ {movie.rating}</span>

            <span>{movie.year}</span>

            <span>{movie.duration}</span>

            <span className="movie-modal__badge">{movie.maturityRating}</span>

            <span className="movie-modal__badge">{movie.quality}</span>
          </div>

          {movie.tagline && (
            <p className="movie-modal__tagline">{movie.tagline}</p>
          )}

          <p className="movie-modal__description">{movie.description}</p>

          <div className="movie-modal__section">
            <h3>Genres</h3>

            <p>{movie.genres?.join(" • ") || movie.genre}</p>
          </div>

          <div className="movie-modal__section">
            <h3>Cast</h3>

            <p>{movie.cast.join(", ")}</p>
          </div>

          <div className="movie-modal__section">
            <h3>Director</h3>

            <p>{movie.director}</p>
          </div>

          <div className="movie-modal__section">
            <h3>Language</h3>

            <p>{movie.language}</p>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

export default MovieModal;
