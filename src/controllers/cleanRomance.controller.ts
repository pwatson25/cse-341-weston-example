import { Request, Response, NextFunction } from "express";
import CR from "../models/cleanRomances";

const create = async (req: Request, res: Response, next: NextFunction) => {
  /*
    #swagger.parameters["cleanRomance"] = {
        in: "body",
        description: "Clean Romance Book To Create",
        required: true,
        schema: {
          title: "Title",
          authorFirst: "Author First Name",
          authorLast: "Author Last Name",
          listPrice: "$9.99",
          img_url: "url",
          description: "Enter Description Here",
          publishedDate: "January 1, 2022",
          isbn-13: "000000000000",
          reviews: [
            {
              stars: "5",
              content: "Enter Content Here",
              person: "Enter Reviewer Name Here",
              reviewLocation: "city, state}
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

const getBook= async (req: Request, res: Response, next: NextFunction) => {

  try {
    const tags = req.params.tags;
    const result = await CR.find({ tags: tags });

    res.json(tags);
  } catch (error) {
    next(error);
  }
};


export { create, index, getBook };
