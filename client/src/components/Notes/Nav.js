import React from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ setIsLogin }) => {
  const logOutSubmit = () => {
    localStorage.clear();
    setIsLogin(false);
  };

  return (
    <header>
      <div className="logo">
        <h1>
          <Link to="/">Bishal Notes</Link>
        </h1>
      </div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Note</Link>
        </li>
        <li onClick={logOutSubmit}>
          <Link to="/">LogOut</Link>
        </li>
      </ul>
    </header>
  );
};

export default Nav;
