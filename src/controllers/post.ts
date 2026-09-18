import type { Request, Response, NextFunction } from "express"
import CustomError from "../errors/customError.js"
import { GetPost, GetAllPostsByUserId, CreatePost } from "../utils/zod.js"
import {
  getPost,
  getAllPosts,
  getAllPostsByUserId,
  createPost,
} from "../models/post.js"

export async function getPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = GetPost.parse(req.params)
    const post = await getPost(postId)
    if (!post)
      return res
        .status(404)
        .json({ error: null, data: null, message: "Post not found" })

    res.status(200).json({ error: null, data: post, message: "Post found" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getAllPostsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const allPosts = await getAllPosts()

    if (allPosts.length === 0)
      return res
        .status(404)
        .json({ error: null, data: [], message: "No posts found" })

    res
      .status(200)
      .json({ error: null, data: allPosts, message: "Posts found" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getAllPostsByUserIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = GetAllPostsByUserId.parse(req.params)
    const allPosts = await getAllPostsByUserId(userId)
    if (allPosts.length === 0)
      return res
        .status(404)
        .json({ error: null, data: [], message: "No posts found" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function createPostController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, authorId } = CreatePost.parse(req.body)
    const post = await createPost({ body, authorId })
    res.status(201).json({ error: null, data: post, message: "Post created" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}
