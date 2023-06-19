import config from '../../../config'
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
  if (!res) {
    throw new Error('Faild to create User!')
  }
  return res
}

export default { createUser }
