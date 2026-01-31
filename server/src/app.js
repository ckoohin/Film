import express from "express";
import dotenv from "dotenv";
import connectDB from "./database";
import cors from "cors";
import router from "./routers";

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});