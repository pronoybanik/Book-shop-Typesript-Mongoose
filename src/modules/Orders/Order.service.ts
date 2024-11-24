import { IOrder } from './Order.interface';
import { OrderModule } from './Order.module';

const createOrderFromDB = async (data: IOrder) => {
  const result = await OrderModule.create(data);
  return result;
};

const calculateTotalRevenue = async () => {
  const result = await OrderModule.aggregate([
    {
      $project: {
        totalOrderPrice: { $multiply: ['$quantity', '$totalPrice'] },
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: { $sum: '$totalOrderPrice' },
      },
    },
  ]);

  const totalRevenue = result.length > 0 ? result[0].totalRevenue : 0;
  return totalRevenue;
};

export const OrderService = {
  createOrderFromDB,
  calculateTotalRevenue,
};
