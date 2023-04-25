export default class Note {
  id: string
  title: string
  description: string
  archive: boolean

  constructor (id: string, title: string, description: string) {
    this.id = id
    this.title = title
    this.description = description
    this.archive = false
  }
}
