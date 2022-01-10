import React, { ChangeEvent, FC, FormEvent, useState } from 'react'
import axios from 'axios'
import { IIsLogin } from '../App'

interface IUser {
  username?: string
  email: string
  password: string
}

const Login: FC<IIsLogin> = ({ setIsLogin }) => {
  const [user, setUser] = useState<IUser>({} as IUser)
  const [error, setError] = useState('')

  const { username, email, password } = user

  // REGISTER HANDLER
  const registerHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const registerSubmit = async (
    e: FormEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/register', {
        username,
        email,
        password
      })
      setUser({ username: '', email: '', password: '' })
      setError(res.data.msg)
    } catch (error: any) {
      error.response.data.msg && setError(error.response.data.msg)
    }
  }

  // LOGIN HANDLER
  const loginHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    })
    setError('')
  }

  const loginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const res = await axios.post('/users/login', { email, password })
      localStorage.setItem('tokenStore', res.data.token)
      setIsLogin(true)
      setUser({ email: '', password: '' })
      setError(res.data.msg)
    } catch (error: any) {
      error.response.data.msg && setError(error.response.data.msg)
    }
  }

  const [onLogin, setOnLogin] = useState<boolean>(false)
  const style = {
    visibility: onLogin ? 'visible' : 'hidden',
    opacity: onLogin ? 1 : 0
  }
  return (
    <section className='login-page'>
      <div className='login create-note'>
        <h2>Login</h2>
        <h3>{error}</h3>
        <form onSubmit={loginSubmit}>
          <input
            type='email'
            name='email'
            value={email}
            placeholder='Email'
            onChange={loginHandler}
          />
          <input
            type='password'
            name='password'
            value={password}
            placeholder='Password'
            onChange={loginHandler}
          />
          <button>Login</button>
          <p>
            Don't have an account?{' '}
            <span onClick={() => setOnLogin(true)}>Register here</span>
          </p>
        </form>
      </div>
      <div className='register create-note' style={style as any}>
        <h2>Register</h2>
        <h3>{error}</h3>
        <form onSubmit={registerSubmit}>
          <input
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={registerHandler}
          />
          <input
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={registerHandler}
          />
          <input
            type='password'
            name='password'
            placeholder='Password'
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
  )
}

export default Login
