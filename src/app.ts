import * as dotenv from 'dotenv'
import express from 'express'
import routes from './infra/routes/routes'

import 'reflect-metadata'
import { container } from 'tsyringe'
import NoteRepositoryInMemory from './infra/repository/NoteRepositoryInMemory'
import NoteRepositoryMongoDB from './infra/repository/NoteRepositoryMongoDB'
import ListNotesUsecase from './core/usecase/ListNotesUsecase'
import GetNoteUsecase from './core/usecase/GetNoteUsecase'
import CreateNoteUsecase from './core/usecase/CreateNoteUsecase'
import UpdateNoteUsecase from './core/usecase/UpdateNoteUsecase'
import DeleteNoteUsecase from './core/usecase/DeleteNoteUsecase'
import type NoteRepository from './core/repository/NoteRepository'

dotenv.config()

const app = express()

const port = process.env?.APP_PORT ?? 3000
const storage = process.env?.APP_STORAGE ?? 'memory'

const noteRepository: NoteRepository = storage === 'memory'
  ? new NoteRepositoryInMemory()
  : new NoteRepositoryMongoDB(process.env?.MONGODB_URL as string, process.env?.MONGODB_DBNAME as string)

container.register<ListNotesUsecase>(ListNotesUsecase, { useValue: new ListNotesUsecase(noteRepository) })
container.register<GetNoteUsecase>(GetNoteUsecase, { useValue: new GetNoteUsecase(noteRepository) })
container.register<CreateNoteUsecase>(CreateNoteUsecase, { useValue: new CreateNoteUsecase(noteRepository) })
container.register<UpdateNoteUsecase>(UpdateNoteUsecase, { useValue: new UpdateNoteUsecase(noteRepository) })
container.register<DeleteNoteUsecase>(DeleteNoteUsecase, { useValue: new DeleteNoteUsecase(noteRepository) })

app.use(express.json())
app.use(routes)

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
