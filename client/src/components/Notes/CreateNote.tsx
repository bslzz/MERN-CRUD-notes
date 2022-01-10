import React, { ChangeEvent, FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export interface ICreateNotes {
  title: string
  content: string
  date: string
  id?: string
}

const CreateNote = () => {
  const [note, setNote] = useState<ICreateNotes>({} as ICreateNotes)

  const { title, content, date } = note

  const navigate = useNavigate()

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  const noteSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const newNote = { title, content, date }
        await axios.post('notes/create', newNote, {
          headers: { Authorization: token }
        })
        return navigate('/')
      }
    } catch (error) {
      window.location.href = '/'
    }
  }

  return (
    <div className='create-note'>
      <h2>Create Note</h2>
      <form onSubmit={noteSubmit}>
        <div className='row'>
          <label htmlFor='title'>Title</label>
          <input
            type='text'
            name='title'
            value={title}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className='row'>
          <label htmlFor='content'>Content</label>
          <textarea
            name='content'
            value={content}
            required
            rows={10}
            onChange={onChangeInput}
          />
        </div>
        <div className='row'>
          <label htmlFor='date'>Date: {date}</label>
          <input
            type='date'
            name='date'
            value={date}
            onChange={onChangeInput}
            required
          />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  )
}

export default CreateNote
