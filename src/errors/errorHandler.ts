import type { Request, Response, NextFunction } from "express"

interface CustomError extends Error {
  status: number
}

function errorHandler(
  error: CustomError,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.status(error.status).json({ message: error.message, data: null })
}

export default errorHandler
