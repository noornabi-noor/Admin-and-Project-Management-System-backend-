import bcrypt from "bcryptjs";
import { prisma } from "../../lib/prisma";

const registerViaInviteService = async (
  token: string,
  name: string,
  password: string,
) => {
  const invite = await prisma.invite.findUnique({
    where: { token },
  });

  if (!invite) {
    throw new Error("Invite not found");
  }

  if (invite.acceptedAt) {
    throw new Error("Invite already used");
  }

  if (invite.expiresAt < new Date()) {
    throw new Error("Invite expired");
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: invite.email },
  });
  if (existingUser) {
    throw new Error("User with this email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email: invite.email,
      name,
      password: hashedPassword,
      role: invite.role,
      invitedAt: new Date(),
      emailVerified: true,
    },
  });

  await prisma.invite.update({
    where: { token },
    data: { acceptedAt: new Date() },
  });

  return user;
};

export const authServices = {
  registerViaInviteService,
};
