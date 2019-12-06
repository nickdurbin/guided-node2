const express = require("express")
const hubRouter = require("./routers/hub")
const welcomeRouter = require("./routers/welcome")
const server = express()

server.use(express.json())

server.use("/", welcomeRouter)
server.use("/api/hubs", hubRouter)

server.listen(4000, () => {
  console.log("\n*** Server Running on http://localhost:4000 ***\n")
})