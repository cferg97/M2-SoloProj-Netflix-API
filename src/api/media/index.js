import express from "express";
import uniqid from "uniqid";
import httpErrors from "http-errors";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";

const mediaRouter = express.Router();

mediaRouter.get("/", async (req, res, next) => {
  try {
    const media = await getMedia();
    res.send(media);
  } catch (err) {
    next(err);
  }
});

export default mediaRouter;
