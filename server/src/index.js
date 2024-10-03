import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import sticksRouter from "./routes/sticks.js";
import bidsRouter from "./routes/bids.js";
import usersRouter from "./routes/users.js";

const app = express()
const port = 3000

import auth from './routes/auth.js';

dotenv.config();

app.use(
    //allow cors for :5173
    cors({
        origin: ['http://localhost:5173', 'http://localhost:8080'],
        credentials: true
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**
 * Create a new router for all routes, this will ensure /api
 * is prepended to all routes without manually typing it out
 **/
const apiRouter = express.Router();

apiRouter.use("/auth", auth);
apiRouter.use("/sticks", sticksRouter);
apiRouter.use("/bids", bidsRouter);
apiRouter.use("/users", usersRouter);

app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Здарова, порт – ${port}`)
})