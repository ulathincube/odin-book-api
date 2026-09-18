import prisma from "../utils/prisma.js"

interface User {
  username: string
  password: string
  email: string
  fullname: string
}

export async function getUserById(id: string) {
  const response = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      fullname: true,
      username: true,
      profile: true,
      posts: true,
      followedBy: true,
      following: true,
      sentMessages: true,
      receivedMessages: true,
      pinnedMessage: true,
    },
  })
  return response
}

export async function getUserByEmail(email: string) {
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  })
  return response
}

export async function getAllUsers() {
  const response = await prisma.user.findMany()
  return response
}

export async function createUser({
  fullname,
  email,
  username,
  password,
}: User) {
  const response = await prisma.user.create({
    data: {
      fullname,
      email,
      username,
      password,
    },
  })
  return response
}
