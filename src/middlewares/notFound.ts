import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

// 404 Not Found Handler
const NotFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: 'API Not Found',
        error: '',
    });
};

export default NotFound;
