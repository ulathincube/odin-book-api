import prisma from "../utils/prisma.js"

interface User {
  username: string
  password: string
  email: string
  fullname: string
}

interface UserFollow {
  currentUser: string
  userToFollow: string
}

export async function getUserById(id: string) {
  const response = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      fullname: true,
      username: true,
      profile: {
        select: {
          id: true,
          status: true,
          birthday: true,
          location: true,
          avatar: true,
        },
      },
      posts: {
        select: {
          id: true,
          body: true,
          likes: true,
          created: true,
        },
      },
      followedBy: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              avatar: true,
              status: true,
            },
          },
          fullname: true,
        },
      },
      following: {
        select: {
          id: true,
          username: true,
          profile: {
            select: {
              avatar: true,
              status: true,
            },
          },
          fullname: true,
        },
      },
      _count: {
        select: {
          followedBy: true,
          following: true,
        },
      },
      // sentMessages: {
      //   select: {
      //     body: true,
      //     created: true,
      //     id: true,
      //   },
      // },
      // receivedMessages: true,
      // pinnedMessage: true,
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
      id: true,
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

export async function followUser({ currentUser, userToFollow }: UserFollow) {
  const response = await prisma.user.update({
    where: {
      id: currentUser,
    },
    data: {
      following: {
        connect: {
          id: userToFollow,
        },
      },
    },
  })
  return response
}

export async function getFollowersCount(userId: string) {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      _count: {
        select: {
          followedBy: true,
        },
      },
    },
  })
  return response
}

export async function getFollowingCount(userId: string) {
  const response = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      _count: {
        select: {
          following: true,
        },
      },
    },
  })
  return response
}

// export async getAllPostsByUserId
