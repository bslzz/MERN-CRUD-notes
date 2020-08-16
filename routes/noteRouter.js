const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');
const noteCtrl = require('../controllers/noteCtrl');

//Get Notes
router.get('/', auth, noteCtrl.getNotes);
//Post Notes
router.post('/create', auth, noteCtrl.createNotes);
//Edit Notes
router.put('/:id', auth, noteCtrl.editNotes);
//Delete Notes
router.delete('/:id', auth, noteCtrl.deleteNotes);
//Find Note by Id
router.get('/:id', auth, noteCtrl.findNotesById);

module.exports = router;
