import { Request, Response, NextFunction } from "express";
import fairytale from "../models/fairytales";

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.parameters["fantasy"] = {
        in: "body",
        description: "Fantasy or Fairytale Book To Create",
        required: true,
        schema: {
          title: "any",
          authorFirst: "any",
          authorLast: "any",
          listPrice: "$",
          img_url: "url",
          description: "any",
          publishedDate: "January 1, 2022",
          isbn-13: "#",
          reviews: [
            {
              stars: "#",
              content: "any",
              person: "any",
              reviewLocation: "city, state}
          ]
        }
    }
   */

  const {   title, authorFirst, authorLast, listPrice, img_url, description, publishedDate, isbn, reviews } = req.body;

  try {
    const response = await fairytale.create({ 
      title, authorFirst, authorLast, listPrice, img_url, description, publishedDate, isbn, reviews });
    res.json(response);
  } catch (error) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  const { review } = req.query;

  try {
    const fairytales = await fairytale.find({ "review.name": review });
    res.json(fairytales);
  } catch (error) {
    next(error);
  }
};

export { create, index };
