import express from 'express';
import { UserControllers } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
const routes = express.Router();

routes.post('/register',
    validateRequest(UserValidation.userValidationSchema),
    UserControllers.createUser);

routes.post('/login',
    // validateRequest(UserValidation.userValidationSchema),
    UserControllers.loginUser);

export const UserRoutes = routes;
