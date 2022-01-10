import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { ICreateNotes } from './CreateNote'

const EditNote = () => {
  const { ID } = useParams()
  const [note, setNote] = useState<ICreateNotes>({} as ICreateNotes)

  const { title, content, date, id } = note
  const navigate = useNavigate()

  const onChangeInput = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore')
      if (ID) {
        const res = await axios.get(`/notes/${ID}`, {
          headers: { Authorization: token }
        })
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id
        })
      }
    }
    getNote()
  }, [ID])

  const editNote = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try {
      const token = localStorage.getItem('tokenStore')
      if (token) {
        const newNote = { title, content, date }
        await axios.put(`/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote}>
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

export default EditNote
