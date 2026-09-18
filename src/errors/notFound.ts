import type { Request, Response, NextFunction } from "express"
import CustomError from "./customError.js"

function notFound(req: Request, res: Response, next: NextFunction) {
  const error = new CustomError(404, "Unable to find this resource")
  return next(error)
}

export default notFound
