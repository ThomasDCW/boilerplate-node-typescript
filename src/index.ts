import wildercontroller from "./controller/WilderController";
import skillcontroller from "./controller/SkillController";
import gradeController from "./controller/GradeController";
import express, { Request, Response } from "express";
import cors from "cors";
import dataSource from "./utils";

const app = express();
const PORT = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  res.send("Hello World");
});

app.get("/api/wilder", wildercontroller.read);
app.post("/api/wilder", wildercontroller.create);
app.put("/api/wilder/addskill", wildercontroller.addSkill);
app.delete("/api/wilder/:id", wildercontroller.delete);
app.put("/api/wilder", wildercontroller.update);
app.put("/api/wilder-rate-skill", wildercontroller.rateSkill);

app.get("/api/skill", skillcontroller.read);
app.post("/api/skill", skillcontroller.create);
app.delete("/api/skill/:id", skillcontroller.delete);
app.put("/api/skill", skillcontroller.update);

app.get("/api/grade", gradeController.read);
app.post("/api/grade", gradeController.create);
app.put("/api/grade", gradeController.update);
app.delete("/api/grade/:id", gradeController.delete);

const start = async (): Promise<void> => {
  await dataSource.initialize();
  app.listen(PORT, () => {
    console.log("Server started on 3000");
  });
};

void start();
