import { Request, Response } from "express";
import { Grade } from "../entity/Grade";
import dataSource from "../utils";

const GradeController = {
  create: (req: Request, res: Response) => {
    dataSource
      .getRepository(Grade)
      .save(req.body)
      .then(() => {
        res.send("Value created");
      })
      .catch((err) => {
        console.log(err, "Error when creating Value");
        res.send("Error when creating Value");
      });
  },

  read: async (req: Request, res: Response) => {
    try {
      const allGrades = await dataSource.getRepository(Grade).find();
      res.send(allGrades);
    } catch (err) {
      console.log(err);
      res.send("Error while reading the Values");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Grade).delete(req.params.id);
      res.send("Value deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting Value");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Grade)
        .update({ id: req.body.id }, { value: req.body.value });
      res.send("Value updated");
    } catch (err) {
      console.log(err);
      res.send("Value not updated");
    }
  },
};
export default GradeController;
