import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { email, password } = user;

  const loginHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/login', { email, password });
      localStorage.setItem('tokenStore', res.data.token);
      setIsLogin(true);
      setUser({ email: '', password: '' });
      setError(res.data.msg);
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

  return (
    <section>
      <h3>{error}</h3>
      <div className="login">
        <h2>Login</h2>
        <form onSubmit={loginSubmit}>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            onChange={loginHandler}
          />
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            onChange={loginHandler}
          />
          <button>Login</button>
          <p>
            Don't have an account? <span>Register here</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
