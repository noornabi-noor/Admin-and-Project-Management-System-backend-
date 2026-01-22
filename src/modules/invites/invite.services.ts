import { UserRole } from "../../../generated/prisma/enums";
import crypto from "crypto";
import { prisma } from "../../lib/prisma";

const createInvite = async (
  email: string,
  role: UserRole,
  invitedById: string,
) => {
  const token = crypto.randomBytes(32).toString("hex");

  return prisma.invite.create({
    data: {
      email,
      role,
      token,
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24h
      invitedById,
    },
  });
};

const getInviteByToken = async (token: string) => {
  return prisma.invite.findUnique({ where: { token } });
};

const acceptInvite = async (token: string) => {
  return prisma.invite.update({
    where: { token },
    data: { acceptedAt: new Date() },
  });
};

export const inviteServices = {
  createInvite,
  getInviteByToken,
  acceptInvite,
};
