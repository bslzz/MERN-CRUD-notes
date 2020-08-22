import React, { useState } from 'react';
import Login from './components/Login';
import Notes from './components/Notes';
import Register from './components/Register';

const App = () => {
  const [isLogin, setIsLogin] = useState(false);
  return (
    <>
      {isLogin ? <Notes /> : <Login setIsLogin={setIsLogin} />}
      <Register />
    </>
  );
};

export default App;
