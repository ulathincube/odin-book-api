import prisma from "../utils/prisma.js"

interface Post {
  body: string
  authorId: string
}

export async function getPost(id: string) {
  const response = await prisma.post.findUnique({
    where: {
      id,
    },
  })
  return response
}

export async function getAllPosts() {
  const response = await prisma.post.findMany()
  return response
}

export async function getAllPostsByUserId(id: string) {
  const response = await prisma.post.findMany({
    where: {
      author: {
        id,
      },
    },
  })
  return response
}

export async function createPost({ body, authorId }: Post) {
  const response = await prisma.post.create({
    data: {
      body,
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  })
  return response
}
