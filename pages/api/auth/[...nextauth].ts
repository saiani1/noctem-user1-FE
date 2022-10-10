import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Login",
      credentials: {
        username: { label: "Email", type: "text", placeholder: "sample@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        const user = { id: 1, token: "test", cred: credentials, req: req };

        if (user) {
          return user;
        } else {
          return null;
        }
      }
    })
  ],
  secret: process.env.SECRET,
})