import React, { useState } from 'react';

const Login = () => {
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

  return (
    <section>
      <h3>{error}</h3>
      <div className="login">
        <h2>Login</h2>
        <form>
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
