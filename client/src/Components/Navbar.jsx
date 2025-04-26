import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "../styles/Navbar.css";

const navItems = () => {
  const items = [
    { id: 1, title: "Home", url: "/" },
    { id: 2, title: "Profile", url: "/profile" },
    { id: 3, title: "Blog Creation", url: "/blogs" },
    { id: 4, title: "Logout", url: "/auth" },
  ];

  return items;
};
const Navbar = () => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar">
      <div className="container">
        {/* Logo */}
        <div className="logo">
          <Link to="/">Blog Platform</Link>
        </div>

        {/* Desktop Nav */}
        <ul className="nav-links">
          {navItems().map((item) => (
            <li key={item.id}>
              <Link
                to={item.url}
                className={`nav-item ${
                  location.pathname === item.url ? "active" : ""
                } `}
                onClick={item.title === "Logout" ? handleLogout : null}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Toggle */}
        <div className="menu-toggle" onClick={toggleMenu}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <ul className="mobile-nav-links">
          {navItems().map((item) => (
            <li key={item.id}>
              <Link
                to={item.url}
                onClick={() => {
                  setIsOpen(false);
                  if (item.title === "Logout") handleLogout();
                }}
                className={`mobile-nav-item ${
                  location.pathname === item.url ? "active" : ""
                }`}
              >
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
