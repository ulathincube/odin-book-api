import app from "./app.js"
import { PORT } from "./utils/constants.js"
import CustomError from "./errors/customError.js"

if (!PORT)
  throw new CustomError(
    500,
    "--PORT number not explicitly stated: server won't start--",
  )

app.listen(PORT, (error: unknown) => {
  if (error instanceof Error) throw error
  console.log(`--server running on port ${PORT}--`)
})
