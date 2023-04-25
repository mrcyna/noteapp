import type Note from '../entity/Note'
import type NoteRepository from '../repository/NoteRepository'

export default class ListNotesUsecase {
  constructor (private readonly noteRepository: NoteRepository) {}

  async execute (): Promise<Note[]> {
    return await this.noteRepository.findAll()
  }
}
