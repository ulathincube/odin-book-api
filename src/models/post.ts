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
    select: {
      body: true,
      created: true,
      id: true,
      likes: true,
      author: {
        select: {
          fullname: true,
          username: true,
          profile: {
            select: {
              avatar: true,
            },
          },
        },
      },
      comments: {
        select: {
          body: true,
          id: true,
          created: true,
          likes: true,
          author: {
            select: {
              fullname: true,
              username: true,
              profile: {
                select: {
                  avatar: true,
                },
              },
            },
          },
        },
      },
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
    select: {
      id: true,
      body: true,
      created: true,
      likes: true,
      author: {
        select: {
          profile: {
            select: {
              avatar: true,
            },
          },
        },
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

export async function likePost({
  postId,
  likes,
}: {
  postId: string
  likes: number
}) {
  const response = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likes,
    },
  })
  return response
}
