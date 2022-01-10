const Note = require('../models/noteModel')

module.exports = {
  //GET NOTES

  getNotes: async (req, res) => {
    try {
      const notes = await Note.find({ user_id: req.user.id })
      res.json(notes)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  // CREATE NOTES
  createNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body
      if (!title || !content)
        return res.status(400).json({ msg: 'Enter all fields' })

      const newNote = new Note({
        title,
        content,
        date,
        user_id: req.user.id,
        name: req.user.name
      })

      const savedNote = await newNote.save()
      res.json(savedNote)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //DELETE NOTES
  deleteNotes: async (req, res) => {
    try {
      await Note.findByIdAndDelete(req.params.id)
      res.json({ msg: 'Deleted Note Successfully' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //EDIT NOTES
  editNotes: async (req, res) => {
    try {
      const { title, content, date } = req.body
      await Note.findOneAndUpdate(
        { _id: req.params.id },
        { title, content, date }
      )
      res.json({ msg: 'Updated Note Successfully' })
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  },

  //Find note by id
  findNotesById: async (req, res) => {
    try {
      const findNote = await Note.findById(req.params.id)
      res.json(findNote)
    } catch (error) {
      return res.status(500).json({ msg: error.message })
    }
  }
}
