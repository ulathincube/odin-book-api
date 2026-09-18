import * as z from "zod"

// Message Schemas
export const GetMessage = z.object({
  messageId: z.string(),
})

export const CreateMessage = z.object({
  body: z.string().nonempty(),
  senderId: z.string(),
  receiverId: z.string(),
})

export const GetAllMessages = z.object({
  senderId: z.string(),
  receiverId: z.string(),
})

// Post Schemas

export const GetPost = z.object({
  postId: z.string(),
})

export const GetAllPostsByUserId = z.object({
  userId: z.string(),
})

export const CreatePost = z.object({
  body: z.string().min(10).max(200),
  authorId: z.string(),
})
