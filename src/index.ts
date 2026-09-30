import server from "./app.js"
import { PORT } from "./utils/constants.js"
import CustomError from "./errors/customError.js"

if (!PORT)
  throw new CustomError(
    500,
    "--PORT number not explicitly stated: server won't start--"
  )

server.listen(PORT, () => {
  console.log(`--server running on port ${PORT}--`)
})
