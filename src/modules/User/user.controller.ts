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

const getSingleUser = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await UserServices.getSingleUserIntoDB(id);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all user by Id!',
        data: result
    });
});
const getAllUser = catchAsync(async (req, res) => {
    const result = await UserServices.getAllUserIntoDB();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Get all user!',
        data: result
    });
});

const updateUser = catchAsync(async (req, res) => {
    const userData = req.body;
    const { id } = req.params;
    const result = await UserServices.updateUserIntoDB(id, userData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Update user successfully',
        data: result
    });
});

export const UserControllers = {
    createUser,
    loginUser,
    getAllUser,
    updateUser,
    getSingleUser
};