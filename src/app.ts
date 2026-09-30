import express from "express"
import { createServer } from "node:http"
import cors from "cors"
import morgan from "morgan"
import { ORIGIN } from "./utils/constants.js"
import notFound from "./errors/notFound.js"
import errorHandler from "./errors/errorHandler.js"
import CustomError from "./errors/customError.js"
import messageRouter from "./routes/message.js"
import postRouter from "./routes/post.js"
import profileRouter from "./routes/profile.js"
import commentRouter from "./routes/comment.js"
import userRouter from "./routes/user.js"
import { Server } from "socket.io"

if (!ORIGIN)
  throw new CustomError(500, "--Origin URL not provided: Server exiting--")

const app = express()
const server = createServer(app)
const io = new Server(server)

// WEBSOCKET CONNECTIONS GO HERE

io.on("connection", (socket) => {
  console.log("A user connected")

  socket.on("message", (data) => {
    console.log({ data })
  })
})

app.use(
  cors({
    origin: ORIGIN,
    credentials: true,
    methods: ["GET", "POST"],
  })
)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("tiny"))

app.use("/api/messages", messageRouter)
app.use("/api/posts", postRouter)
app.use("/api/users", userRouter)
app.use("/api/profiles", profileRouter)
app.use("/api/comments", commentRouter)

app.use("/{*splat}", notFound)
app.use(errorHandler)

export default server
