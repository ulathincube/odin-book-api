import prisma from "../utils/prisma.js"

interface Connection {
  senderId: string
  receiverId: string
}

interface Message extends Connection {
  body: string
}

export async function getMessage(id: string) {
  const response = await prisma.message.findUnique({
    where: {
      id,
    },
  })
  return response
}

export async function createMessage({ body, senderId, receiverId }: Message) {
  const response = await prisma.message.create({
    data: {
      body,
      from: {
        connect: {
          id: senderId,
        },
      },
      to: {
        connect: {
          id: receiverId,
        },
      },
    },
  })
  return response
}

export async function getAllMessages({ senderId, receiverId }: Connection) {
  const response = await prisma.message.findMany({
    where: {
      OR: [
        {
          AND: [
            {
              from: {
                id: senderId,
              },
              to: {
                id: receiverId,
              },
            },
          ],
        },
        {
          AND: [
            {
              from: {
                id: receiverId,
              },
              to: {
                id: senderId,
              },
            },
          ],
        },
      ],
    },
    orderBy: {
      created: "desc",
    },
  })
  return response
}
