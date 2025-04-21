import { Model } from "mongoose";

export interface TUser {
  _id: string
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'active' | 'blocked';
  needsPasswordChange: boolean,
  passwordChangedAt: Date,
}

export type TLoginUser = {
  email: string;
  password: string;
};

export interface UserInterface extends Model<TUser> {
  //instance methods for checking if the user exist
  isUserExistsByCustomId(id: string): Promise<TUser>;
  //instance methods for checking if passwords are matched
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
};


export const USER_ROLE = {
  user: 'user',
  admin: 'admin',
} as const;

export type TUserRole = keyof typeof USER_ROLE;
