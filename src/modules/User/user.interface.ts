import { Model } from "mongoose";

export interface TUser {
  _id: string
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
  status: 'in-progress' | 'blocked';
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
}