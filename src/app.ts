import express from "express"
import cors from "cors"
import morgan from "morgan"
import { ORIGIN } from "./utils/constants.js"
import notFound from "./errors/notFound.js"
import errorHandler from "./errors/errorHandler.js"
import CustomError from "./errors/customError.js"

if (!ORIGIN)
  throw new CustomError(500, "--Origin URL not provided: Server exiting--")

const app = express()

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  }),
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))

app.use("/{*splat}", notFound)
app.use(errorHandler)

export default app
