import type Note from '../../core/entity/Note'
import type NoteRepository from '../../core/repository/NoteRepository'
import { MongoClient, ObjectId } from 'mongodb'

enum collection {
  notes = 'notes'
}

export default class NoteRepositoryMongoDB implements NoteRepository {
  private readonly client
  private readonly database

  constructor (url: string, database: string) {
    this.client = new MongoClient(url)
    this.database = database
  }

  async findAll (): Promise<Note[]> {
    await this.client.connect()
    const db = this.client.db(this.database)
    const result = await db.collection(collection.notes).find({}).toArray()

    const notes: Note[] = []
    for (const item of result) {
      notes.push({
        id: item?._id.toString(),
        title: item?.title as string,
        description: item?.description as string,
        archive: item?.archive as boolean
      })
    }

    return notes
  }

  async find (id: string): Promise<Note | undefined> {
    await this.client.connect()
    const db = this.client.db(this.database)

    const query = { _id: new ObjectId(id) }
    const result = await db.collection(collection.notes).findOne(query)

    return {
      id: result?._id.toString() as string,
      title: result?.title as string,
      description: result?.description as string,
      archive: result?.archive as boolean
    }
  }

  async create (title: string, description: string): Promise<Note> {
    await this.client.connect()
    const db = this.client.db(this.database)

    const insertResult = await db.collection(collection.notes).insertOne({
      title,
      description,
      archive: false
    })

    return await this.find(insertResult.insertedId.toString()) as Note
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

    await this.client.connect()
    const db = this.client.db(this.database)

    const query = { _id: new ObjectId(id) }
    await db.collection(collection.notes).updateOne(query, { $set: note })

    return await this.find(id)
  }

  async delete (id: string): Promise<void> {
    await this.client.connect()
    const db = this.client.db(this.database)

    const query = { _id: new ObjectId(id) }
    await db.collection(collection.notes).deleteOne(query)
  }
}
