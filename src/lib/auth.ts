import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./prisma";
import nodemailer from "nodemailer";

// nodemailer for email verification
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.APP_USER,
    pass: process.env.APP_PASS,
  },
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
    requireEmailVerification: true,
  },

  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url, token }, request) => {
      const verificationUrl = `${process.env.APP_URL}/verify-email?token=${token}`;
      await transporter.sendMail({
        from: '"Admin and Project Management System" <projectmanagementapp@gmail.com>',
        to: user.email,
        subject: "Please Verify Your Email!",
        html: `<p>Verify your email by clicking <a href="${verificationUrl}">here</a></p>`,
      });
    },
  },

  // sign up by google
  socialProviders: {
    google: {

      // To always get a refresh token
      accessType: "offline",
      prompt: "select_account consent",
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },

  
  user: {
    additionalFields: {
      role: { type: "string" },   // Prisma enum stored as string
      status: { type: "string" }, // Prisma enum stored as string
    },
  },
});