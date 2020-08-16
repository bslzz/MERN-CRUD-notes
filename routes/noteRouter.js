const express = require('express');
const router = express.Router();

//Get Notes
router.get('/', (req, res) => {
  res.json({ msg: 'Take notes' });
});
//Post Notes
router.post('/', (req, res) => {
  res.json({ msg: 'Take notes' });
});
//Edit Notes
router.put('/:id', (req, res) => {
  res.json({ msg: 'Take notes' });
});
//Delete Notes
router.delete('/:id', (req, res) => {
  res.json({ msg: 'Take notes' });
});

module.exports = router;
