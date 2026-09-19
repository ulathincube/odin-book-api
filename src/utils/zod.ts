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

// Profile Schemas

export const GetProfile = z.object({
  profileId: z.string(),
})

export const CreateProfile = z.object({
  birthday: z.string().optional(),
  status: z.string().min(5).max(30).optional(),
  location: z.string().optional(),
  avatar: z.string().optional(),
  userId: z.string(),
})

// User Schemas

export const GetUserById = z.object({
  userId: z.string(),
})

export const GetUserByEmail = z.object({
  email: z.email().optional(),
})

export const CreateUser = z.object({
  fullname: z.string(),
  email: z.email(),
  username: z.string(),
  password: z.string(),
})
