import { Request, Response } from 'express';
import { OrderService } from './Order.service';

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;
    console.log(data);

    const result = await OrderService.createOrderFromDB(data);
    console.log(result);

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error) {
    res.status(400).json({
      message: 'something went wrong',
      success: false,
      err: error,
    });
  }
};

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

export const OrderController = {
  createOrder,
  getTotalRevenue,
};
