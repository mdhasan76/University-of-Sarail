import { Request, Response } from 'express'
import userService from './user.service'

const createUser = async (req: Request, res: Response) => {
  try {
    const { user } = req.body
    const result = await userService.createUser(user)
    res.status(200).send({
      success: true,
      msg: 'User create successfull',
      result: result,
    })
  } catch (err) {
    res.status(400).send({
      success: false,
      msg: 'Faild to create user',
    })
  }
}

export default createUser