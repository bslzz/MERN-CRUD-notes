import React, { useState, useEffect, FC } from 'react'
import Login from './components/Login'
import Notes from './components/Notes'
import axios from 'axios'

export interface IIsLogin {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>
}

const App: FC = () => {
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const checkLogin = async () => {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const verified = await axios.get('/users/verify', {
          headers: { Authorization: token }
        })
        console.log(verified)
        setIsLogin(verified.data)
        if (verified.data === false) return localStorage.clear()
      } else {
        setIsLogin(false)
      }
    }
    checkLogin()
  }, [])

  return (
    <>
      {isLogin ? (
        <Notes setIsLogin={setIsLogin} />
      ) : (
        <Login setIsLogin={setIsLogin} />
      )}
    </>
  )
}

export default App
