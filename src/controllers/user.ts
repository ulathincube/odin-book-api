import type { Request, Response, NextFunction } from "express"
import * as z from "zod"
import CustomError from "../errors/customError.js"
import { GetUserByEmail, GetUserById, CreateUser } from "../utils/zod.js"
import {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
} from "../models/user.js"

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = GetUserById.parse(req.params)
    const user = await getUserById(userId)
    if (!user)
      return res
        .status(404)
        .json({ error: null, data: null, message: "User not found" })
    res.status(200).json({ error: null, data: user, message: "User found" })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
      const customError = new CustomError(500, JSON.stringify(error.issues))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getUserByEmailController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email } = GetUserByEmail.parse(req.body)
    const user = await getUserByEmail(email)

    if (!user)
      return res
        .status(404)
        .json({ error: null, data: null, message: "User not found" })
    res.status(200).json({ error: null, data: user, message: "User found" })
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
      const customError = new CustomError(500, JSON.stringify(error.issues))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getAllUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allUsers = await getAllUsers()
    if (allUsers.length === 0)
      return res
        .status(404)
        .json({ error: null, data: [], message: "No users found" })
    res
      .status(200)
      .json({ error: null, data: allUsers, message: "Users found" })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
      const customError = new CustomError(500, JSON.stringify(error.issues))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function createUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { fullname, username, email, password } = CreateUser.parse(req.body)
    const user = await createUser({ fullname, username, email, password })
    res.status(200).json({ error: null, data: user, message: "User created" })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
      const customError = new CustomError(500, JSON.stringify(error.issues))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}
