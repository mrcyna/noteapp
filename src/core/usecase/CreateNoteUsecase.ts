import type Note from '../entity/Note'
import type NoteRepository from '../repository/NoteRepository'

export default class CreateNoteUsecase {
  constructor (private readonly noteRepository: NoteRepository) {}

  async execute (title: string, description: string): Promise<Note> {
    return await this.noteRepository.create(title, description)
  }
}
