import AppError from "../../middlewares/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { UserModel } from "./user.module";
import httpStatus from 'http-status';
import { createToken } from "./user.utils";
import config from "../../app/config";
import mongoose from "mongoose";

const createUserIntoBD = async (payload: TUser) => {
    const newStudent = await UserModel.create(payload);
    return newStudent;
};

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(payload.email);
    console.log(user);
    

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
    }

    // checking if the user is blocked
    const userStatus = user?.status;

    if (userStatus === 'blocked') {
        throw new AppError(httpStatus.FORBIDDEN, 'This user is blocked !');
    }

    //checking if the password is correct
    if (!(await UserModel.isPasswordMatched(payload?.password, user?.password)))
        throw new AppError(httpStatus.FORBIDDEN, 'Password do not matched');

    const jwtPayload = {
        userId: user._id,
        role: user.role,
    };    

    const accessToken = createToken(
        jwtPayload,
        config.jwt_access_secret as string,
        config.jwt_access_expires_in as string,
      );
    
      const refreshToken = createToken(
        jwtPayload,
        config.jwt_refresh_secret as string,
        config.jwt_refresh_expires_in as string,
      );

    return {
        accessToken,
        refreshToken,
    };
};

const getAllUserIntoDB = async () => {
    const result = await UserModel.find()
    return result;
};

const updateUserIntoDB = async (id: string, data: TUser) => {
    const objectId = new mongoose.Types.ObjectId(id);
    const result = await UserModel.updateOne({ _id: objectId }, data, {
        runValidators: true,
    });
    return result;
};

const getSingleUserIntoDB = async (id: string,) => {   
    const result = await UserModel.findById(id);
    return result;
};

export const UserServices = {
    createUserIntoBD,
    loginUser,
    getSingleUserIntoDB,
    getAllUserIntoDB,
    updateUserIntoDB
};