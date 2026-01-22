import { prisma } from "../../lib/prisma";

const createProject = async (
  name: string,
  description: string,
  userId: string,
) => {
  return prisma.project.create({
    data: { name, description, createdById: userId },
  });
};

const getProjects = async () => {
  return prisma.project.findMany({
    where: { isDeleted: false },
    include: { createdBy: true },
  });
};

const updateProject = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  return prisma.project.update({ where: { id }, data });
};

const softDeleteProject = async (id: string) => {
  return prisma.project.update({
    where: { id },
    data: {
      isDeleted: true,
      status: "DELETED",
    },
  });
};

export const projectServices = {
  createProject,
  getProjects,
  updateProject,
  softDeleteProject,
};
