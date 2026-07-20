import "./Hero.scss";

function Hero() {
  return (
    <section className="hero">
      {/* Background */}
      <div className="hero__background">
        <img
          src="./src/assets/images/heroimg.jpeg"
          alt="Featured Movie"
          className="hero__background-image"
        />

        <div className="hero__overlay"></div>
      </div>

      {/* Content */}
      <div className="container">
        <div className="hero__wrapper">
          <div className="hero__content">
            <div className="hero__meta">
              <span className="hero__meta-item">⭐ 8.9</span>
              <span className="hero__meta-item">2025</span>
              <span className="hero__meta-item">Action • Adventure</span>
            </div>

            <h1 className="hero__title">
              Avengers:
              <br />
              Endgame
            </h1>

            <p className="hero__description">
              After the devastating events of Infinity War, the Avengers
              assemble once more to reverse Thanos' actions and restore balance
              to the universe.
            </p>

            <div className="hero__actions">
              <button className="hero__primary-btn">▶ Watch Now</button>

              <button className="hero__secondary-btn">+ My List</button>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <button className="hero__prev" aria-label="Previous Slide">
        ❮
      </button>

      <button className="hero__next" aria-label="Next Slide">
        ❯
      </button>

      {/* Dots */}
      <div className="hero__dots">
        <button className="hero__dot hero__dot--active"></button>
        <button className="hero__dot"></button>
        <button className="hero__dot"></button>
        <button className="hero__dot"></button>
      </div>
    </section>
  );
}

export default Hero;
