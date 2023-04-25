import { type Response, type Request } from 'express'
import 'reflect-metadata'
import { container } from 'tsyringe'
import ListNotesUsecase from '../../core/usecase/ListNotesUsecase'
import GetNoteUsecase from '../../core/usecase/GetNoteUsecase'
import CreateNoteUsecase from '../../core/usecase/CreateNoteUsecase'
import UpdateNoteUsecase from '../../core/usecase/UpdateNoteUsecase'
import DeleteNoteUsecase from '../../core/usecase/DeleteNoteUsecase'

export default class NoteController {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async listNotes (req: Request, res: Response) {
    const listNotesUsecase = container.resolve(ListNotesUsecase)
  
    const notes = await listNotesUsecase.execute()
    res.json(notes)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async showNote (req: Request, res: Response) {
    const getNoteUsecase = container.resolve(GetNoteUsecase)
  
    const id = req.params.id
    const note = await getNoteUsecase.execute(id)
    res.json(note)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async createNote (req: Request, res: Response) {
    const createNoteUsecase = container.resolve(CreateNoteUsecase)
  
    const { title, description } = req.body
    const note = await createNoteUsecase.execute(title, description)
    res.status(201)
    res.json(note)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async updateNote (req: Request, res: Response) {
    const updateNoteUsecase = container.resolve(UpdateNoteUsecase)
  
    const id = req.params.id
    const { title, description, archive } = req.body
    const note = await updateNoteUsecase.execute(id, title, description, archive)
    res.json(note)
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async deleteNote (req: Request, res: Response) {
    const deleteNoteUsecase = container.resolve(DeleteNoteUsecase)
  
    const id = req.params.id
    await deleteNoteUsecase.execute(id)
    res.json({ message: 'marked for deleation' })
  }

  static instantiate (): NoteController {
    return new NoteController()
  }
}
