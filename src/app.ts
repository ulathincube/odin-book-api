import express from "express"
import cors from "cors"
import morgan from "morgan"
import { ORIGIN } from "./utils/constants.js"

if (!ORIGIN) throw new Error("--Origin URL not provided: Server exiting--")

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

export default app
