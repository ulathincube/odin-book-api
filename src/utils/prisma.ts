import { PrismaPg } from "@prisma/adapter-pg"
import { PrismaClient } from "../generated/prisma/client.js"
import { DATABASE_URL } from "./constants.js"
import CustomError from "../errors/customError.js"

if (!DATABASE_URL)
  throw new CustomError(500, "--Database was not provided: Server exiting--")

const adapter = new PrismaPg({
  connectionString: DATABASE_URL,
})

const prisma = new PrismaClient({
  adapter,
})

export default prisma
