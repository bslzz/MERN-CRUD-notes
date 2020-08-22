import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setIsLogin }) => {
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { username, email, password } = user;
  const registerHandler = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
    setError('');
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/users/register', {
        username,
        email,
        password,
      });
      setUser({ username: '', email: '', password: '' });
      setError(res.data.msg);
    } catch (error) {
      error.response.data.msg && setError(error.response.data.msg);
    }
  };

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

  const [onLogin, setOnLogin] = useState(false);
  const style = {
    visibility: onLogin ? 'visible' : 'hidden',
    opacity: onLogin ? 1 : 0,
  };
  return (
    <section className="login-page">
      <div className="login create-note">
        <h2>Login</h2>
        <h3>{error}</h3>
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
            Don't have an account?{' '}
            <span onClick={() => setOnLogin(true)}>Register here</span>
          </p>
        </form>
      </div>
      <div className="register create-note" style={style}>
        <h2>Register</h2>
        <h3>{error}</h3>
        <form onSubmit={registerSubmit}>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={username}
            onChange={registerHandler}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={registerHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={registerHandler}
          />
          <button>Register</button>
          <p>
            Already have an account?{' '}
            <span onClick={() => setOnLogin(false)}>Login here</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
