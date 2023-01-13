import express from "express";
import listEndpoints from "express-list-endpoints";
import cors from "cors";
import * as dotenv from "dotenv";
import mediaRouter from "./api/media/index.js";
import {
  genericErrorHandler,
  unauthorizedHandler,
  notFoundHandler,
  badRequestHandler,
} from "./errorHandlers.js";

dotenv.config();

const server = express();
const port = process.env.PORT;

server.use(cors());
server.use(express.json());

server.use("/media", mediaRouter);

server.use(badRequestHandler);
server.use(unauthorizedHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

server.listen(port, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on port ${port}`);
});
