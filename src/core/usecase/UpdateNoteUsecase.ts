import type Note from '../entity/Note'
import type NoteRepository from '../repository/NoteRepository'

export default class UpdateNoteUsecase {
  constructor (private readonly noteRepository: NoteRepository) {}

  async execute (id: string, title: string, description: string, archive: boolean): Promise<Note | undefined> {
    return await this.noteRepository.update(id, { title, description, archive } satisfies Partial<Note>)
  }
}
