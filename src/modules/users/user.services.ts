import { UserRole, UserStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const getUsers = async (skip: number, take: number) => {
  return prisma.user.findMany({
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
};

const updateUserRole = async (id: string, role: UserRole) => {
  return prisma.user.update({
    where: { id },
    data: { role },
  });
};

const updateUserStatus = async (id: string, status: UserStatus) => {
  return prisma.user.update({
    where: { id },
    data: { status },
  });
};

export const userServices = {
  getUsers,
  updateUserRole,
  updateUserStatus,
};
