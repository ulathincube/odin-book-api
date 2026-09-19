import prisma from "./utils/prisma.js"
import { faker } from "@faker-js/faker"

// interface User {
//   fullname: string
//   username: string
//   email: string
//   password: string
//   profile: {
//     status: string
//     birthday: string
//     avatar: string
//     location: string
//   }
//   posts: { body: string }[]
// }

async function insertUserToDB() {
  try {
    const response = await prisma.user.create({
      data: {
        fullname: faker.person.fullName(),
        username: faker.internet.username(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        profile: {
          create: {
            status: faker.person.bio(),
            birthday: faker.date.birthdate(),
            avatar: faker.image.avatar(),
            location: faker.location.city(),
          },
        },
        posts: {
          create: [
            {
              body: faker.lorem.sentence({ min: 5, max: 20 }),
            },
            {
              body: faker.lorem.sentence({ min: 5, max: 20 }),
            },
            {
              body: faker.lorem.sentence({ min: 5, max: 20 }),
            },
            {
              body: faker.lorem.sentence({ min: 5, max: 20 }),
            },
            {
              body: faker.lorem.sentence({ min: 5, max: 20 }),
            },
          ],
        },
      },
    })
    return response
  } catch (error: unknown) {
    if (error instanceof Error) throw error
  }
}

async function insertManyUsersToDB() {
  try {
    for (let i = 0; i < 10; i++) {
      insertUserToDB()
    }
  } catch (error: unknown) {
    if (error instanceof Error) throw error
  } finally {
    await prisma.$disconnect()
  }
}

insertManyUsersToDB()
