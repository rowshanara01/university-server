import httpStatus from "http-status"; // http status library
import {NextFunction, Request, Response } from "express";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'not found',
    error: '',
  });
}

export default notFound;