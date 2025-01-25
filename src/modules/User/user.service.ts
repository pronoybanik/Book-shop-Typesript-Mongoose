import AppError from "../../middlewares/AppError";
import { TLoginUser, TUser } from "./user.interface";
import { UserModel } from "./user.module";
import httpStatus from 'http-status';
import { createToken } from "./user.utils";
import config from "../../app/config";

const createUserIntoBD = async (payload: TUser) => {
    const newStudent = await UserModel.create(payload);
    return newStudent;
};

const loginUser = async (payload: TLoginUser) => {
    // checking if the user is exist
    const user = await UserModel.isUserExistsByCustomId(payload.email);

    if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
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

export const UserServices = {
    createUserIntoBD,
    loginUser
};