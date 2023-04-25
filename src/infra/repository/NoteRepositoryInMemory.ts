import Note from '../../core/entity/Note'
import type NoteRepository from '../../core/repository/NoteRepository'
import { v4 as uuidv4 } from 'uuid'

export default class NoteRepositoryInMemory implements NoteRepository {
  private notes: Note[] = [
    new Note(uuidv4(), 'Hello World!', 'This is a simple task')
  ]

  async findAll (): Promise<Note[]> {
    return await Promise.resolve(this.notes)
  }

  async find (id: string): Promise<Note | undefined> {
    return await Promise.resolve(this.notes.find(n => n.id === id))
  }

  async create (title: string, description: string): Promise<Note> {
    const id = uuidv4()
    const note = new Note(id, title, description)

    this.notes.push(note)
    return await this.find(id) as Note
  }

  async update (id: string, changes: Partial<Note>): Promise<Note | undefined> {
    const note = await this.find(id)

    if (note === undefined) {
      return
    }

    if (changes.title !== undefined) {
      note.title = changes.title
    }

    if (changes.description !== undefined) {
      note.description = changes.description
    }

    if (changes.archive !== undefined) {
      note.archive = changes.archive
    }

    for (let i = 0; i < this.notes.length; i++) {
      if (this.notes[i].id === id) {
        this.notes[i] = note
      }
    }

    return note
  }

  async delete (id: string): Promise<void> {
    this.notes = this.notes.filter(n => n.id !== id)
  }
}
