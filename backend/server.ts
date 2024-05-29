import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./app";

dotenv.config();

const DB: string = process.env.DATABASE || "";
const PORT = process.env.PORT || 3000;

if (!DB) throw new Error("database is not availble");

mongoose.connect(DB).then(() => console.log("connected to database"));

app.listen(PORT, () => {
  console.log(`app listen to port ${PORT}`);
});
