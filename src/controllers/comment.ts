import type { Request, Response, NextFunction } from "express"
import { GetPost, CreateComment } from "../utils/zod.js"
import { getAllComments, createComment } from "../models/comment.js"

export async function getAllCommentsController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { postId } = GetPost.parse(req.params)

  const allComments = await getAllComments(postId)
  return res
    .status(200)
    .json({ data: allComments, error: null, message: "Comments list found" })
  try {
  } catch (error: unknown) {
    if (error instanceof Error) next(error)
  }
}

export async function createCommentController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { postId } = GetPost.parse(req.params)
    const commentObject = CreateComment.parse(req.body)
    const comment = await createComment({ ...commentObject, postId })

    return res
      .status(201)
      .json({ data: comment, error: null, message: "Comment created" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      next(error)
    }
  }
}
