import prisma from "../utils/prisma.js"

interface CreateComment {
  authorId: string
  body: string
  postId: string
}

export async function createComment({ authorId, body, postId }: CreateComment) {
  const response = await prisma.comment.create({
    data: {
      body,
      post: {
        connect: {
          id: postId,
        },
      },
      author: {
        connect: {
          id: authorId,
        },
      },
    },
  })
  return response
}

export async function getAllComments(postId: string) {
  const response = await prisma.comment.findMany({
    where: {
      post: {
        id: postId,
      },
    },
  })
  return response
}
