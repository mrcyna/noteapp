import type Note from '../entity/Note'
import type NoteRepository from '../repository/NoteRepository'

export default class GetNoteUsecase {
  constructor (private readonly noteRepository: NoteRepository) {}

  async execute (id: string): Promise<Note | undefined> {
    return await this.noteRepository.find(id)
  }
}
