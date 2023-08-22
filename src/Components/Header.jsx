import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";

const Header = ({
  isLoggedIn,
  setIsLoggedIn,
  loggedInUser,
  setLoggedInUser,
}) => {
  useEffect(() => {
    setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    setLoggedInUser(JSON.parse(localStorage.getItem("loggedInUser")));
  }, []);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedInUser");
    setIsLoggedIn(false);
    setLoggedInUser(null);
    navigate("/login");
  };

  const fullName = loggedInUser
    ? `${loggedInUser.firstName} ${loggedInUser.lastName}`
    : "";

  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <div>
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="Logo" height="50" />
          </Link>
        </div>
        <div className="mr-2">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  Home
                </Link>
              </li>
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">
                      Signup
                    </Link>
                  </li>
                </>
              )}
              {isLoggedIn && (
                <li className="nav-item dropdown">
                  <div
                    className="nav-link dropdown-toggle"
                    onClick={() => setShowDropdown(!showDropdown)}
                    role="button"
                  >
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img (31).webp"
                      className="rounded-circle"
                      height="22"
                      alt="Avatar"
                      loading="lazy"
                    />
                  </div>
                  <div
                    className={`dropdown-menu${showDropdown ? " show" : ""}`}
                    style={{ position: "absolute", right: 0 }}
                  >
                    <span className="dropdown-item">Welcome {fullName}!</span>
                    <button
                      className="dropdown-item btn btn-link"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
