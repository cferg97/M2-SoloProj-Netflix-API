import { fileURLToPath } from "url";
import { dirname, join } from "path";
import fs from "fs-extra";

const { readJSON, writeJSON, createReadStream, createWriteStream } = fs;

const dataFolderPath = join(dirname(fileURLToPath(import.meta.url)), "../data");

const mediaJSONPath = join(dataFolderPath, "media.json");

export const getMedia = () => readJSON(mediaJSONPath);
export const writeMedia = (arr) => writeJSON(mediaJSONPath, arr);
