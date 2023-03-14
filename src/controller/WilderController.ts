import { Request, Response } from "express";
import { Skill } from "../entity/Skill";
import { Grade } from "../entity/Grade";
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

  addSkill: async (req: Request, res: Response) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ name: req.body.wilderName });
      console.log("wilder", wilderToUpdate);
      const skillToAdd = await dataSource
        .getRepository(Skill)
        .findOneByOrFail({ name: req.body.skillName });
      wilderToUpdate.skills?.push(skillToAdd);
      console.log("Skill", skillToAdd);
      await dataSource.getRepository(Wilder).save(wilderToUpdate);
      res.send("Skill added to wilder");
    } catch (err) {
      console.log(err);
      res.send("Error while adding skill to wilder");
    }
  },
  rateSkill: async (req: Request, res: Response) => {
    try {
      const wilderToUpdate = await dataSource
        .getRepository(Wilder)
        .findOneByOrFail({ name: req.body.wilderName });
      console.log(wilderToUpdate);
      const skillToRate = await dataSource
        .getRepository(Skill)
        .findOneByOrFail({ name: req.body.skillName });
      console.log(skillToRate);
      await dataSource.getRepository(Grade).save({
        value: req.body.value,
        skills: skillToRate,
        wilders: wilderToUpdate,
      });
      res.send("Skill successfully rated !");
    } catch (err) {
      console.log(err);
      res.send("Error while rating the skill.");
    }
  },
};
export default WilderController;
