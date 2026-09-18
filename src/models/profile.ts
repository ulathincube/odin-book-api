import prisma from "../utils/prisma.js"

interface OptionalFields {
  birthday?: string
  location?: string
  status?: string
  avatar?: string
}

interface Profile extends OptionalFields {
  userId: string
}

export async function getProfile(id: string) {
  const response = await prisma.profile.findUnique({
    where: {
      id,
    },
  })
  return response
}

export async function createProfile({
  birthday,
  status,
  location,
  avatar,
  userId,
}: Profile) {
  const profileObject: OptionalFields = {}

  if (birthday) {
    profileObject.birthday = birthday
  }

  if (status) {
    profileObject.status = status
  }

  if (location) {
    profileObject.location = location
  }

  if (avatar) {
    profileObject.avatar = avatar
  }

  const response = await prisma.profile.create({
    data: {
      user: {
        connect: {
          id: userId,
        },
        ...profileObject,
      },
    },
  })
  return response
}
