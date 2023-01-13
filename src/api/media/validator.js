import { checkSchema, validationResult } from "express-validator";
import createHttpError from "http-errors";

const mediaSchema = {
  Title: {
    in: ["body"],
    isString: {
      errorMessage: "Title is a mandatory field.",
    },
  },
  Year: {
    in: ["body"],
    isString: {
      errorMessage: "Year is a mandatory field.",
    },
  },
  imdbID: {
    in: ["body"],
    isString: {
      errorMessage: "imdbID is a mandatory field.",
    },
  },
  Type: {
    in: ["body"],
    isString: {
      errorMessage: "Type is a mandatory field.",
    },
  },
};

export const checkMediaSchema = checkSchema(mediaSchema);
export const triggerBadRequest = (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors.array());
  if (!errors.isEmpty()) {
    next(
      createHttpError(400, "Error during post validation", {
        errorsList: errors.array(),
      })
    );
  } else {
    next();
  }
};
