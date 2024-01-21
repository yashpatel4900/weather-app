import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav className="bg-gradient-to-r from-cyan-500 to-blue-500 p-4 text-white shadow-md">
      <ul className="flex justify-center space-x-4">
        <li className="hover:text-blue-300">
          <Link to="/">Home</Link>{" "}
          {/* Using Link from react-router-dom for better SPA experience */}
        </li>
        <li className="hover:text-blue-300">
          <Link to="/about">About</Link>{" "}
          {/* Using Link from react-router-dom for better SPA experience */}
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
