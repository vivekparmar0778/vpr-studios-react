import "./Navbar.css";
import { navLinks } from "../../../constants/navLinks";

function Navbar() {
  return (
    <header className="header">
      <div className="container">
        <nav className="navbar">
          <a href="/" className="logo">
            VPR Studios
          </a>
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={link.path}>{link.title}</a>
              </li>
            ))}
          </ul>
          <button className="sign-btn">Sign In</button>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
