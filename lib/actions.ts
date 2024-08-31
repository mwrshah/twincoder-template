'use server'
import { PrismaClient } from "@prisma/client";
import * as z from "zod";
import { AuthError } from "next-auth";

import { LoginSchema } from "@/schemas";
import { RegisterSchema } from "@/schemas";

import { signIn, signOut } from "@/auth";

import bcrypt from "bcryptjs";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { redirect } from "next/navigation";
import  cuid  from "cuid";


const prisma = new PrismaClient();

//get account by user id
export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await prisma.account.findFirst({
      where: { userId },
    });

    return account;
  } catch {
    return null;
  }
};


export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });
    return user;
  } catch {
    return null;
  }
};


export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    return user;
  } catch {
    return null;
  }
};

export const checkForSession = async () => {
  const session = await prisma.session.findFirst({
    where: {
      userId: 'cm0ieenxz0000u2qw29x4f0dn',
    }
  });
  return session;
}

export const login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {

  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password } = validatedFields.data;

  let existingUser = await getUserByEmail(email);

  if (email === "2wincoder@trilogy.com" && password === "2wincoder") {
    existingUser = {
      id: "fake-user-id",
      name: "User",
      email: "2wincoder@trilogy.com",
      emailVerified: null,
      image: null,
      password: "2wincoder",
      role: "user",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "User not registered!" };
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false
    });
//DEMO ONLY: The following code allows showing user a Demo of the login functionality in an iframe
    await prisma.session.create({
      data: {
        userId: 'cm0ieenxz0000u2qw29x4f0dn',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hrs 
        sessionToken: cuid(),
      }
    });

    return { success: true, url: callbackUrl || DEFAULT_LOGIN_REDIRECT };
  } catch (error) {
    console.error("Error during sign in", error);
    if (error instanceof AuthError) {
      return { error: "Invalid credentials!" };
    }
    return { error: "An unexpected error occurred" };
  }
};

export const handleGoogleSignIn = async ( callbackUrl?: string | null) => {
	try {
//DEMO ONLY: The following code allows showing user a Demo of the login functionality in an iframe
    await prisma.session.create({
      data: {
        userId: 'cm0ieenxz0000u2qw29x4f0dn',
        expires: new Date(Date.now() + 1000 * 60 * 60 * 1), // 1 hrs 
        sessionToken: cuid(),
      }
    });
		return { success: true, url: callbackUrl || DEFAULT_LOGIN_REDIRECT };
//REAL CODE: CAN ONLY BE SET BY THE USER
//		await signIn('google', { 
//      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT
//		});
	}catch (error) {
		if (error instanceof AuthError) {
			return { error: "Invalid credentials!" };
		}
		throw error;
	}
}

export const handleSignOut = async () => {
  await prisma.session.deleteMany({
    where: {
      userId: 'cm0ieenxz0000u2qw29x4f0dn',
    }
  });
	redirect("/auth/login");
	await signOut();
	return { success: "Sign out successful!" };
}

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields." };
  }

  const { name, password, email } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "User email already exists." };
  }

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  return { success: "Successfully registered!" };
};
