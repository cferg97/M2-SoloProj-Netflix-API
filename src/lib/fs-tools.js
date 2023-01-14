import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const mediaJSONPath = join(dataFolderPath, "media.json");
const reviewsJSONPath = join(dataFolderPath, "reviews.json");

export const getMedia = () => readJSON(mediaJSONPath);
export const writeMedia = (arr) => writeJSON(mediaJSONPath, arr);

export const getReviews = () => readJSON(reviewsJSONPath);
export const writeReviews = (arr) => writeJSON(reviewsJSONPath, arr);
