import React, { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { format } from 'timeago.js'
import axios from 'axios'

export interface INotes {
  name: string
  title: string
  content: string
  date: string
  _id: string
}

const Home: FC = () => {
  const [notes, setNotes] = useState<INotes[]>([])
  const [token, setToken] = useState<string | null>(null)

  const getNotes = async (token: string) => {
    const res = await axios.get('/notes', {
      headers: {
        Authorization: token
      }
    })
    setNotes(res.data)
  }

  const deleteNote = async (id: string) => {
    try {
      if (token) {
        await axios.delete(`/notes/${id}`, {
          headers: { Authorization: token }
        })
        getNotes(token)
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('tokenStore')
    setToken(token)
    if (token) {
      getNotes(token)
    }
  }, [])

  console.log('notes', notes)

  return (
    <div className='note-wrapper'>
      {notes.map((note: INotes) => (
        <div key={note._id} className='card'>
          <h4 title={note.title}>{note.title}</h4>
          <div className='text-wrapper'>
            <p>{note.content}</p>
          </div>
          <p className='date'>{format(note.date)}</p>
          <div className='card-footer'>
            {note.name}
            <Link to={`edit/${note._id}`}>Edit</Link>
          </div>
          <button className='close' onClick={() => deleteNote(note._id)}>
            X
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
