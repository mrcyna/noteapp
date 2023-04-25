import type Note from '../entity/Note'

export default interface NoteRepository {
  findAll: () => Promise<Note[]>
  find: (id: string) => Promise<Note | undefined>
  create: (title: string, description: string) => Promise<Note>
  update: (id: string, changes: Partial<Note>) => Promise<Note | undefined>
  delete: (id: string) => Promise<void>
}
