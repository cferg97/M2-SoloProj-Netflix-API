import express from "express";
import uniqid from "uniqid";
import httpErrors from "http-errors";
import * as dotenv from "dotenv";
import { getMedia, writeMedia } from "../../lib/fs-tools.js";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import { getPDFReadableStream } from "../../lib/pdf-tools.js";
import { pipeline } from "stream";

dotenv.config();

const mediaRouter = express.Router();

const cloudinaryPosterUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "media/posters",
    },
  }),
}).single("poster");

mediaRouter.get("/", async (req, res, next) => {
  try {
    const media = await getMedia();
    res.send(media);
  } catch (err) {
    next(err);
  }
});

mediaRouter.get("/:id", async (req, res, next) => {
  try {
    const media = await getMedia();
    const match = media.find((m) => m.imdbID === req.params.id);
    res.send(match);
  } catch (err) {
    next(err);
  }
});

mediaRouter.get("/:id/pdf", async (req, res, next) => {
  try {
    res.setHeader("Content-Disposition", "attachment; filename=media.pdf");
    const media = await getMedia();
    const matchedMedia = media.find((m) => m.imdbID === req.params.id);
    const source = await getPDFReadableStream(matchedMedia);
    const destination = res;
    pipeline(source, destination, (err) => {
      if (err) console.log(err);
    });
  } catch (err) {
    next(err);
  }
});

mediaRouter.post("/", async (req, res, next) => {
  try {
    const newMedia = {
      ...req.body,
      
    };
    const media = await getMedia();
    media.push(newMedia);
    await writeMedia(media);
    res.status(201).send({ id: newMedia.imdbID });
  } catch (err) {
    next(err);
  }
});

mediaRouter.post(
  "/:id/poster",
  cloudinaryPosterUpload,
  async (req, res, next) => {
    try {
      const media = await getMedia();
      const index = media.findIndex((m) => m.imdbID === req.params.id);
      if (index !== -1) {
        const oldMedia = media[index];
        const updated = { ...oldMedia, poster: req.file.path };
        media[index] = updated;
        await writeMedia(media);
        res.send(updated);
      } else {
        res.status(404).send(`Could not find media with ID ${req.params.id}`);
      }
    } catch (err) {
      next(err);
    }
  }
);

export default mediaRouter;
