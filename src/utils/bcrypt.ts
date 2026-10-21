import bcrypt from "bcryptjs"
import { SALTROUNDS } from "./constants.js"

export async function hashPassword(password: string) {
  const salt = await bcrypt.genSalt(SALTROUNDS)
  const hashedPassword = await bcrypt.hash(password, salt)
  return hashedPassword
}

export async function comparePassword(
  password: string,
  hashedPassword: string
) {
  return await bcrypt.compare(password, hashedPassword)
}
