import "./MovieCard.scss";
import {
  HiOutlinePlay,
  HiOutlinePlus,
  HiOutlineInformationCircle,
} from "react-icons/hi2";

function MovieCard({
  movie,
  onClick,
}) {
  const handleClick = () => {
    onClick?.(movie);
  };

  return (
    <article
      className="movie-card"
      tabIndex={0}
      role="button"
      aria-label={`Open details for ${movie.title}`}
      onClick={handleClick}
      onKeyDown={(event) => {
        if (
          event.key === "Enter" ||
          event.key === " "
        ) {
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

        <div className="movie-card__overlay">
          <div className="movie-card__actions">
            <button
              type="button"
              aria-label="Play Movie"
            >
              <HiOutlinePlay />
            </button>

            <button
              type="button"
              aria-label="Add to My List"
            >
              <HiOutlinePlus />
            </button>

            <button
              type="button"
              aria-label="More Information"
              onClick={(event) => {
                event.stopPropagation();
                handleClick();
              }}
            >
              <HiOutlineInformationCircle />
            </button>
          </div>
        </div>
      </div>

      <div className="movie-card__content">
        <h3 className="movie-card__title">
          {movie.title}
        </h3>

        <div className="movie-card__badges">
          <span>{movie.quality}</span>
          <span>{movie.maturityRating}</span>
        </div>

        <div className="movie-card__meta">
          <span>⭐ {movie.rating}</span>

          <span>{movie.year}</span>

          <span>{movie.duration}</span>
        </div>

        <div className="movie-card__genres">
          {movie.genres?.slice(0, 2).join(" • ")}
        </div>
      </div>
    </article>
  );
}

export default MovieCard;