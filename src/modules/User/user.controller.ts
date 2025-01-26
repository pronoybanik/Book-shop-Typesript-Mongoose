import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendRespons";
import httpStatus from 'http-status';
import { UserServices } from "./user.service";
import config from "../../app/config";

const createUser = catchAsync(async (req, res, next) => {

    const result = await UserServices.createUserIntoBD(
        req.body
    );

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User create successfully',
        data: result,
    });
});

const loginUser = catchAsync(async (req, res) => {
    const result = await UserServices.loginUser(req.body);
    const { refreshToken, accessToken } = result;

    res.cookie('refreshToken', refreshToken, {
        secure: config.NODE_ENV === 'production',
        httpOnly: true,
    });

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'User is logged in successfully!',
        data: {
            accessToken
        }
    });
});

export const UserControllers = {
    createUser,
    loginUser
};