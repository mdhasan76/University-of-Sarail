import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import { compare, hash } from 'bcrypt';
import config from '../../../config';

const userSchema = new Schema<IUser, Record<string, undefined>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    needPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

userSchema.methods.doesUserExist = async function (
  id: string
): Promise<Partial<IUser | null>> {
  return await User.findOne(
    { id: id },
    { id: 1, password: 1, needPasswordChange: 1, role: 1 }
  );
};

userSchema.methods.doesPasswordMatched = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await compare(givenPassword, savePassword);
};

userSchema.pre('save', async function (next) {
  // Hash password
  this.password = await hash(
    this.password,
    Number(config.default_bcrypt_round)
  );

  next();
});

export const User = model<IUser, UserModel>('Users', userSchema);
