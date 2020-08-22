import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const EditNote = ({ match }) => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: '',
  });

  const { title, content, date, id } = note;
  const history = useHistory();

  const onChangeInput = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore');
      if (match.params.id) {
        const res = await axios.get(`/notes/${match.params.id}`, {
          headers: { Authorization: token },
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id,
        });
      }
    };
    getNote();
  }, [match.params.id]);

  const editNote = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const newNote = { title, content, date };
        await axios.put(`/notes/${id}`, newNote, {
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
      <h2>Edit Note</h2>
      <form onSubmit={editNote}>
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

export default EditNote;
