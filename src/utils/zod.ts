import * as z from "zod"

export const GetMessage = z.object({
  messageId: z.string(),
})

export const CreateMessage = z.object({
  body: z.string(),
  senderId: z.string(),
  receiverId: z.string(),
})

export const GetAllMessages = z.object({
  senderId: z.string(),
  receiverId: z.string(),
})
