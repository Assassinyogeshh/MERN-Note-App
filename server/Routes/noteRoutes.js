import express from "express";
import auth from '../Auth/auth.js';
import { addNotes, updateNote, fetchAllNotes, deleteNotes, fetchEachNote, searchNotes } from "../Controller/notes.js";

const router = express.Router();

router.post('/addNotes', auth, addNotes);

router.patch('/editNote/:id', updateNote);

router.get('/fetchNotes', auth, fetchAllNotes);

router.get('/searchNotes', auth, searchNotes);

router.get('/eachNote/:id', auth, fetchEachNote);

router.delete('/deleteNotes/:id', deleteNotes);

export default router;

