import express from 'express'
import AppController from '../controllers/AppController'
import NoteController from '../controllers/NoteController'
const routes = express.Router()

const appController = new AppController()
const noteController = new NoteController()

// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/', appController.root)

// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/v1/notes', noteController.listNotes)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.get('/v1/notes/:id', noteController.showNote)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.post('/v1/notes', noteController.createNote)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.put('/v1/notes/:id', noteController.updateNote)
// eslint-disable-next-line @typescript-eslint/no-misused-promises
routes.delete('/v1/notes/:id', noteController.deleteNote)

export default routes
