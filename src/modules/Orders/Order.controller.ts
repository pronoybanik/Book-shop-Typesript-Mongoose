import { Request, Response } from 'express';
import { OrderService } from './Order.service';
import { orderSchemaValidation } from './Order.validation';

const createOrder = async (req: Request, res: Response) => {
  try {
    const data = req.body;

    const { error, value } = orderSchemaValidation.validate(data);
    const result = await OrderService.createOrderFromDB(value);

    if (error) {
      res.status(500).json({
        success: false,
        message: 'something went wrong',
        error: error.details,
      });
    }

    res.status(200).json({
      message: 'Order created successfully',
      status: true,
      data: result,
    });
  } catch (error: any) {
    res.status(400).json({
      message: error.message || 'something went wrong',
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
