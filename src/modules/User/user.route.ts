import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middlewares/auth';
const routes = express.Router();

routes.post('/register',
    validateRequest(UserValidation.registerValidationSchema),
    UserControllers.createUser);

routes.post('/login',
    validateRequest(UserValidation.loginValidationSchema),
    UserControllers.loginUser);

routes.post(
    '/change-password',
    auth(),
    UserControllers.changePassword,
);

routes.get("/", UserControllers.getAllUser);
routes.get("/:id", UserControllers.getSingleUser);
routes.put("/:id", UserControllers.updateUser);

export const UserRoutes = routes;
