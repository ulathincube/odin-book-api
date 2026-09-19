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
  const response = await prisma.post.findMany({
    select: {
      body: true,
      id: true,
      created: true,
      likes: true,
      author: {
        select: {
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
    },
    orderBy: {
      created: "desc",
    },
  })
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
