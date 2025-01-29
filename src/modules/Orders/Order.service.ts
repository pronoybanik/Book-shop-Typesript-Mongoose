import { BooksModule } from '../Books/Book.module';
import { UserModel } from '../User/user.module';
import { IOrder } from './Order.interface';
import { OrderModule } from './Order.module';

const createOrderFromDB = async (order: IOrder) => {
  try {
    const { products, totalPrice, userId } = order;

    // Check if the user exists
    const user = await UserModel.findOne({ _id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    // Check if products exist
    const productIds = products.map((product) => product.productId);
    const existingProducts = await BooksModule.find({ '_id': { $in: productIds } });

    if (existingProducts.length !== products.length) {
      throw new Error('One or more products not found');
    }

    // Create the order
    const orderToCreate = new OrderModule({
      products: products.map((product) => {
        const productDetails = existingProducts.find(p => p._id.toString() === product.productId.toString());
        return {
          productId: productDetails?._id,
          quantity: product.quantity,
        };
      }),
      totalPrice,
      userId: user._id,
    });

    // Save the order..
    await orderToCreate.save();

    return orderToCreate;

  } catch (err: unknown) {
    // Ensure the error is a string or has a message property
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error('An unknown error occurred');
  }
};


const getAllOrderIntoDB = async () => {
  const result = await OrderModule.find()
    .populate('products.productId')  // Populate productId inside the products array
    .populate('userId');  // Populate userId field

  return result;
}



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

const deleteOrderFromDB = async (id: string) => {
  const deleteStudent = await OrderModule.deleteOne({ _id: id });
  return deleteStudent;
};

export const OrderService = {
  createOrderFromDB,
  calculateTotalRevenue,
  getAllOrderIntoDB,
  deleteOrderFromDB
};
