import express from 'express'
import { createNotes, deleteNoteId, getAllNotes, getDetailNotes, updateNoteId } from '../controllers/notesController.js';

// this file is for handling routes of the data processing will be transfered to.

const router = express.Router();

router.get('/', getAllNotes);

router.get('/:id', getDetailNotes);

router.post('/', createNotes);

router.put('/:id', updateNoteId);

router.delete('/:id', deleteNoteId);


export default router;