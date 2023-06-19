import { IUser } from './user.interface'
import { User } from './user.model'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto genarate emplemental id
  // default pass

  const res = await User.create(user)
  if (!res) {
    throw new Error('Faild to create User!')
  }
  return res
}

export default { createUser }
