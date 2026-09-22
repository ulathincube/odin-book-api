import type { Request, Response, NextFunction } from "express"
import * as z from "zod"
import CustomError from "../errors/customError.js"
import {
  GetUserByEmail,
  GetUserById,
  CreateUser,
  FollowUser,
} from "../utils/zod.js"
import {
  getUserById,
  getUserByEmail,
  getAllUsers,
  createUser,
  followUser,
  getFollowersCount,
  getFollowingCount,
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
      const customError = new CustomError(500, JSON.stringify(errorMessage))
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
    const { email } = GetUserByEmail.parse(req.query)

    if (email) {
      const user = await getUserByEmail(email)

      if (!user)
        return res
          .status(404)
          .json({ error: null, data: null, message: "User not found" })
      return res
        .status(200)
        .json({ error: null, data: user, message: "User found" })
    }

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
      const customError = new CustomError(500, JSON.stringify(errorMessage))
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
      const customError = new CustomError(500, JSON.stringify(errorMessage))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function followUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { currentUser, userToFollow } = FollowUser.parse(req.params)
    await followUser({ currentUser, userToFollow })
    return res.status(200).json({
      data: "User followed",
      error: null,
      message: "Success: User followed",
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = error.issues
      const customError = new CustomError(500, JSON.stringify(errorMessage))
      next(customError)
    } else if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getFollowersCountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = GetUserById.parse(req.params)
    const followerCount = await getFollowersCount(userId)
    return res.status(200).json({
      data: followerCount?._count?.followedBy,
      error: null,
      message: "Success: Count retrieved",
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(error.issues)
      const erroObject = new CustomError(500, errorMessage)
      next(erroObject)
    } else if (error instanceof Error) {
      const errorObject = new CustomError(500, error.message)
      next(errorObject)
    }
  }
}

export async function getFollowingCountController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = GetUserById.parse(req.params)
    const following = await getFollowingCount(userId)
    res.status(200).json({
      data: following?._count?.following,
      error: null,
      message: "Success: Count retrieved",
    })
  } catch (error: unknown) {
    if (error instanceof z.ZodError) {
      const errorMessage = JSON.stringify(error.issues)
      const erroObject = new CustomError(500, errorMessage)
      next(erroObject)
    } else if (error instanceof Error) {
      const errorObject = new CustomError(500, error.message)
      next(errorObject)
    }
  }
}
