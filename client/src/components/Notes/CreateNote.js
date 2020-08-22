import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const CreateNote = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
  });

  const { title, content, date } = note;

  const history = useHistory();
  const onChangeInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  const noteSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const newNote = { title, content, date };
        await axios.post('notes/create', newNote, {
          headers: { Authorization: token },
        });
        return history.push('/');
      }
    } catch (error) {
      window.location.href = '/';
    }
  };

  return (
    <div className="create-note">
      <h2>Create Note</h2>
      <form onSubmit={noteSubmit}>
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={onChangeInput}
            required
          />
        </div>
        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            name="content"
            value={content}
            required
            rows="10"
            onChange={onChangeInput}
          />
        </div>
        <div className="row">
          <label htmlFor="date">Date: {date}</label>
          <input
            type="date"
            name="date"
            value={date}
            onChange={onChangeInput}
            required
          />
        </div>
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default CreateNote;
