import express from "express";
import { getReviews, writeReviews } from "../../lib/fs-tools.js";
import httpErrors from "http-errors";
import uniqid from "uniqid";

const reviewRouter = express.Router();

reviewRouter.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    res.send(reviews);
  } catch (err) {
    next(err);
  }
});

reviewRouter.get("/:elementId", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const matches = await reviews.filter(
      (r) => r.elementId === req.params.elementId
    );
    res.send(matches);
  } catch (err) {
    next(err);
  }
});

reviewRouter.post("/:elementid", async (req, res, next) => {
  try {
    const newReview = {
      ...req.body,
      _id: uniqid(),
      elementId: req.params.elementid,
      createdAt: new Date(),
    };
    const reviews = await getReviews();
    reviews.push(newReview);
    await writeReviews(reviews);
    res.status(201).send(newReview);
  } catch (err) {
    next(err);
  }
});

reviewRouter.delete("/:reviewid", async (req, res, next) => {
  try {
    const reviews = await getReviews();
    const remainingReviews = reviews.filter(
      (r) => r._id !== req.params.reviewid
    );
    await writeReviews(remainingReviews);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default reviewRouter;
