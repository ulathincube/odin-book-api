import "dotenv/config"

export const PORT = Number(process.env.PORT) || 5000
export const DATABASE_URL = process.env.DATABASE_URL
export const ORIGIN = process.env.ORIGIN
export const SALTROUNDS = Number(process.env.SALTROUNDS!) || 10
export const JWT_SECRET = process.env.JWT_SECRET
