import "./Footer.scss";

import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

import { Link } from "react-router-dom";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">

      <div className="container">

        <div className="footer__grid">

          {/* Brand */}

          <div className="footer__brand">

            <h2 className="footer__logo">
              VPR Studios
            </h2>

            <p className="footer__text">
              Stream thousands of movies and TV shows in one
              premium entertainment experience.
            </p>

          </div>

          {/* Navigation */}

          <div className="footer__column">

            <h3>Navigation</h3>

            <ul>

              <li>
                <Link to="/">Home</Link>
              </li>

              <li>
                <Link to="/movies">Movies</Link>
              </li>

              <li>
                <Link to="/tv-shows">TV Shows</Link>
              </li>

              <li>
                <Link to="/my-list">My List</Link>
              </li>

            </ul>

          </div>

          {/* Categories */}

          <div className="footer__column">

            <h3>Categories</h3>

            <ul>

              <li>Action</li>

              <li>Adventure</li>

              <li>Comedy</li>

              <li>Sci-Fi</li>

            </ul>

          </div>

          {/* Social */}

          <div className="footer__column">

            <h3>Follow</h3>

            <div className="footer__social">

              <a href="#">
                <FaGithub />
              </a>

              <a href="#">
                <FaLinkedin />
              </a>

              <a href="#">
                <FaInstagram />
              </a>

              <a href="#">
                <FaXTwitter />
              </a>

            </div>

          </div>

        </div>

        <div className="footer__bottom">

          <p>
            © {year} VPR Studios. All Rights Reserved.
          </p>

        </div>

      </div>

    </footer>
  );
}

export default Footer;