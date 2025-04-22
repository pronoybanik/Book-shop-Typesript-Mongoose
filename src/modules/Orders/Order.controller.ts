import { Request, Response } from 'express';
import { OrderService } from './Order.service';
import { orderSchemaValidation } from './Order.validation';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendRespons';
import httpStatus from 'http-status';
import { date } from 'joi';

const createOrder = catchAsync(async (req, res) => {
  const data = req.body;
  const result = await OrderService.createOrderFromDB(data);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: result,
  });
});

const getAllOrder = catchAsync(async (req, res) => {

  const result = await OrderService.getAllOrderIntoDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Get all order',
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  const { id } = req.params
  const result = await OrderService.deleteOrderFromDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Delete order successfully',
    data: result,
  });
})

const getTotalRevenue = async (req: Request, res: Response) => {
  try {
    const totalRevenue = await OrderService.calculateTotalRevenue();

    res.status(200).json({
      message: 'Revenue calculated successfully',
      status: true,
      data: {
        totalRevenue,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      success: false,
      err: error,
    });
  }
};

const getUserOrderProduct = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const result = await OrderService.getUserOrderProductFromDB(userId);

    res.status(200).json({
      message: 'get order products successfully',
      status: true,
      date: result
    });
  } catch (error) {
    res.status(400).json({
      message: 'Something went wrong',
      success: false,
      err: error,
    });
  }
};

export const OrderController = {
  createOrder,
  getTotalRevenue,
  getAllOrder,
  deleteOrder,
  getUserOrderProduct
};
