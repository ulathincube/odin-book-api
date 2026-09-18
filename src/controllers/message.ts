import type { Request, Response, NextFunction } from "express"
import CustomError from "../errors/customError.js"
import { CreateMessage, GetMessage, GetAllMessages } from "../utils/zod.js"
import { getMessage, createMessage, getAllMessages } from "../models/message.js"

export async function getMessageController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { messageId } = GetMessage.parse(req.params)
    const message = await getMessage(messageId)

    if (!message)
      return res
        .status(404)
        .json({ error: null, data: null, message: "Message not found" })
    res
      .status(200)
      .json({ error: null, data: message, message: "Message found" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function createMessageController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { body, senderId, receiverId } = CreateMessage.parse(req.body)
    const message = await createMessage({ body, senderId, receiverId })
    res
      .status(201)
      .json({ error: null, data: message, message: "Message created" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}

export async function getAllMessagesController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { senderId, receiverId } = GetAllMessages.parse(req.query)
    const messages = await getAllMessages({ senderId, receiverId })

    if (messages.length === 0)
      return res
        .status(200)
        .json({ error: null, data: [], message: "No messages" })

    res
      .status(200)
      .json({ error: null, data: messages, message: "Messages found" })
  } catch (error: unknown) {
    if (error instanceof Error) {
      const customError = new CustomError(500, error.message)
      next(customError)
    }
  }
}
