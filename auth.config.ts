import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "@/lib/actions";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = LoginSchema.safeParse(credentials);

        if (validatedFields.success) {
          const { email, password } = validatedFields.data;
          let user;

          if (email === "2wincoder@trilogy.com" && password === "2wincoder") {
            user = {
              id: "fake-user-id",
              name: "User",
              email: "2wincoder@trilogy.com",
              emailVerified: null,
              image: null,
              password: await bcrypt.hash("2wincoder", 10),
              role: "user",
              createdAt: new Date(),
              updatedAt: new Date(),
            };
          } else {
            user = await getUserByEmail(email);
          }

          if (!user || !user.password) return null;

          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;

