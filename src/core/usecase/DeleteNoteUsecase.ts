import type NoteRepository from '../repository/NoteRepository'

export default class DeleteNoteUsecase {
  constructor (private readonly noteRepository: NoteRepository) {}

  async execute (id: string): Promise<void> {
    await this.noteRepository.delete(id)
  }
}
