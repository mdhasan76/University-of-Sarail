import config from '../../../config'
import ApiError from '../../../errors/ApiError'
import { IUser } from './user.interface'
import { User } from './user.model'
import { genarateUserId } from './user.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto genarate emplemental id
  const id = await genarateUserId()
  user.id = id

  // default pass
  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const res = await User.create(user)
  console.log(res)
  if (!res) {
    throw new ApiError(400, 'Faild to create User!')
  }
  return res
}

export const UserService = { createUser }
