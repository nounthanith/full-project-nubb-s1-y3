const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

dotenv.config({ quiet: true })
const app = express()

app.use(cors({
    origin: [
        "http://localhost:5173"
    ]
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
    res.send("Hello World!")
})

const userRouter = require("./routes/user.route")
app.use("/api/users", userRouter)

const categoryRouter = require("./routes/category.route")
app.use("/api/categories", categoryRouter)



module.exports = app