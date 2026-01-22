import { Request, Response } from "express";
import { projectServices } from "./project.services";

const create = async (req: Request, res: Response) => {
  const project = await projectServices.createProject(
    req.body.name,
    req.body.description,
    req.user!.id,
  );
  res.status(201).json(project);
};

const list = async (_: Request, res: Response) => {
  res.json(await projectServices.getProjects());
};

const update = async (req: Request, res: Response) => {
  res.json(
    await projectServices.updateProject(req.params.id as string, req.body),
  );
};

const remove = async (req: Request, res: Response) => {
  await projectServices.softDeleteProject(req.params.id as string);
  res.status(204).send();
};

export const projectController = {
  create,
  list,
  update,
  remove,
};
