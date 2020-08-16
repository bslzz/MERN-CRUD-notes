import React, { useState } from 'react';
import axios from 'axios';

const Register = () => {
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

  return (
    <section>
      <h3>{error}</h3>
      <div className="register">
        <h2>Register</h2>
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
            Already have an account? <span>Login here</span>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Register;
