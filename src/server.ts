import mongoose from 'mongoose'
import express, { Request, Response, urlencoded } from 'express'
import Image from './image.model'
import dotenv from 'dotenv'
import morgan from 'morgan'
import * as config from './config'
import cors from 'cors'
import router from './image.router'
dotenv.config()

const app = express()
const port = process.env.PORT || 8000
const URI = process.env.MONGO_URI

app.use(cors())
app.use(express.json())
app.use(morgan("dev"));
app.use(urlencoded({ extended: true }));
app.use(express.static(config.uploadDir));
app.use("/", router)

mongoose.connect(URI, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log("database connected"));

app.listen(port, () => {
  console.log(`listen in ${port}`)
})