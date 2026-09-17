import app from "./app.js"

app.listen(5000, (error: unknown) => {
  if (error instanceof Error) throw error
  console.log("--server running on port 5000--")
})
