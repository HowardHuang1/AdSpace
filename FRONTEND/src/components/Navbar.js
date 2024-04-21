import React from 'react';
import { Link } from 'react-router-dom';
import "./Navbar.css"

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/" className="nav-link">2D Ad</Link>
        </li>
        <li className="nav-item">
          <Link to="/3dAd" className="nav-link">3D Ad</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;