import React from 'react'
import Header from './Notes/Nav'
import Home from './Notes/Home'
import CreateNote from './Notes/CreateNote'
import EditNote from './Notes/EditNote'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { FC } from 'react'
import { IIsLogin } from '../App'

const Notes: FC<IIsLogin> = ({ setIsLogin }) => {
  return (
    <Router>
      <div className='notes-page'>
        <Header setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/create' element={<CreateNote />} />
            <Route path='/edit/:ID' element={<EditNote />} />
          </Routes>
        </section>
      </div>
    </Router>
  )
}

export default Notes
