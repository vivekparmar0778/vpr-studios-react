import "./MovieCard.scss";

function MovieCard({
  movie,
  onClick,
}) {
  const handleClick = () => {
    if (onClick) {
      onClick(movie);
    }
  };

  return (
    <article
      className="movie-card"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${movie.title}`}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="movie-card__image-wrapper">
        <img
          className="movie-card__image"
          src={movie.image}
          alt={movie.title}
          loading="lazy"
        />
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">
          {movie.title}
        </h3>

        <div className="movie-card__meta">
          <span>⭐ {movie.rating}</span>
          <span>{movie.year}</span>
          <span>{movie.genre}</span>
        </div>

        <span className="movie-card__duration">
          {movie.duration}
        </span>
      </div>
    </article>
  );
}

export default MovieCard;