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
    select: {
      username: true,
      fullname: true,
      profile: {
        select: {
          avatar: true,
          status: true,
        },
      },
    },
  })
  return response
}

export async function getAllUsers() {
  const response = await prisma.user.findMany({
    select: {
      username: true,
      id: true,
      profile: {
        select: {
          status: true,
          avatar: true,
        },
      },
    },
  })
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
