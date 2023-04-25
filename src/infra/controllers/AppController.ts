import { type Response, type Request } from 'express'

export default class AppController {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async root (req: Request, res: Response) {
    res.json({
      message: 'NoteApp is Up & Running',
      timestamp: new Date()
    })
  }

  static instantiate (): AppController {
    return new AppController()
  }
}
