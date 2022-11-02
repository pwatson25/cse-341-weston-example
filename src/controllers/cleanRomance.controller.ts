import { Request, Response, NextFunction } from "express";
import CR from "../models/cleanRomances";

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.parameters["cleanRomance"] = {
        in: "body",
        description: "clean romance to create",
        required: true,
        schema: {
          title: "To Sir, wiht Love",
          authorFirst: "Lauren",
          authorLast: "Layne",
          listPrice: "$12.99",
          img_url: "https://m.media-amazon.com/images/I/41oxMi5iWcL.jpg",
          description: "A nice book!",
          publishedDate: "June 29, 2021",
          isbn: "9780451037497",
          reviews: [
            {
              stars: "1",
              content: "Review content",
              person: "Brother Dransfield",
              reviewLocation: "Idaho, USA"}
          ]
        }
    }
   */


  const {   title, authorFirst, authorLast, listPrice, img_url, description, publishedDate, isbn, reviews } = req.body;

  try {
    const response = await CR.create({ 
      title, authorFirst, authorLast, listPrice, img_url, description, publishedDate, isbn, reviews });

    res.json(response);
  } catch (error) {
    next(error);
  }
};

const index = async (req: Request, res: Response, next: NextFunction) => {
  const { review } = req.query;

  try {
    const cleanRomanances = await CR.find({ "review.name": review });
    res.json(cleanRomanances);
  } catch (error) {
    next(error);
  }
};

export { create, index };
