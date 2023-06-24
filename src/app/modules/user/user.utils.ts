import { User } from './user.model';

export const lastUserId = async () => {
  const userId = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean();
  return userId?.id;
};

export const genarateUserId = async () => {
  // const lastId = await lastUserId();
  const currentId = (await lastUserId()) || (0).toString().padStart(5, '0');
  const incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  return incrementId;
};
