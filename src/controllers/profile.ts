import type { Request, Response, NextFunction } from "express"
import * as z from "zod"
import CustomError from "../errors/customError.js"
import { getProfile, createProfile } from "../models/profile.js"
import { GetProfile, CreateProfile } from "../utils/zod.js"

interface OptionalFields {
  birthday?: string
  location?: string
  status?: string
  avatar?: string
}

interface Profile extends OptionalFields {
  userId: string
}

export async function getProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { profileId } = await GetProfile.parse(req.params)
    const profile = await getProfile(profileId)
    if (!profile)
      return res
        .status(404)
        .json({ error: null, data: null, message: "Profile not found" })
    res
      .status(200)
      .json({ error: null, data: profile, message: "Profile found" })
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

export async function createProfileController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { location, avatar, status, birthday, userId } = CreateProfile.parse(
      req.body
    )

    const profileObject: OptionalFields = {}

    if (location) {
      profileObject.location = location
    }

    if (avatar) {
      profileObject.avatar = avatar
    }

    if (status) {
      profileObject.status = status
    }

    if (birthday) {
      profileObject.birthday = birthday
    }

    const profile = await createProfile({ userId, ...profileObject })
    res
      .status(201)
      .json({ error: null, data: profile, message: "Profile created" })
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
