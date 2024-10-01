import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap/dist/css/bootstrap.min.css'

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
    if (!loggedIn || loggedIn.is === false) {
      setUser(null);
    } else {
      setUser(loggedIn.user);
    }
  }, []);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="fas fa-film"></i> Movies
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon">
            <i className="fas fa-bars"></i>
          </span>
        </button>
        <div className="collapse navbar-collapse full-height" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" aria-current="page" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/movie">Movie</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tv">TV</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/people">People</Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {user === null ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/register">Register</Link>
                </li>
              </>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/logout">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}