import { prisma } from "@/lib/prisma";
import { compare } from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [

        Credentials({

            credentials: {
                email: '',
                password: ''
            },
            async authorize(credentials) {

                const user = await prisma.user.findUnique({
                    where: {
                        email: credentials.email
                    }
                })


                if (!user) {
                    return null
                }

                const correctPassword = await compare(credentials.password, user.password)

                if (correctPassword) {
                    return {
                        id: user.id,
                        email: user.email
                    }
                } else {
                    return null
                }

            }

        })

    ]
})


export { handler as GET, handler as POST }