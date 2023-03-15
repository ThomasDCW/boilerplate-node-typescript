import { Request, Response } from "express";
import { Wilder } from "../entity/Wilder";
import dataSource from "../utils";

const WilderController = {
  create: (req: Request, res: Response) => {
    dataSource
      .getRepository(Wilder)
      .save(req.body)
      .then(() => {
        res.send("Wilder created");
      })
      .catch((err: any) => {
        console.log(err, "Error when creating wilder");
        res.send("Error when creating wilder");
      });
  },

  read: async (req: Request, res: Response) => {
    try {
      const allWilders = await dataSource.getRepository(Wilder).find();
      res.send(allWilders);
    } catch (err) {
      console.log(err);
      res.send("Error while reading the wilders");
    }
  },

  delete: async (req: Request, res: Response) => {
    try {
      await dataSource.getRepository(Wilder).delete(req.params.id);
      res.send("wilder deleted");
    } catch (err) {
      console.log(err);
      res.send("Error while deleting wilder");
    }
  },

  update: async (req: Request, res: Response) => {
    try {
      await dataSource
        .getRepository(Wilder)
        .update({ id: req.body.id }, { name: req.body.name });
      res.send("wilder updated");
    } catch (err) {
      console.log(err);
      res.send("wilder not updated");
    }
  },
};
export default WilderController;
