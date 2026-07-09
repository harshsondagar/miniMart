import "dotenv/config"
import express from "express"
import cors from "cors"
import v1Router from "./routes/v1"


const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/v1", v1Router)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`app is running port : ${PORT}`);
})