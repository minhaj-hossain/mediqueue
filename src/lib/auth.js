import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { jwt } from "better-auth/plugins"
import { mongodbAdapter } from "better-auth/adapters/mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db('mediqueue');

export const auth = betterAuth({
    database: mongodbAdapter(db, {
        client
    }),
    emailAndPassword: {
        enabled: true,
        autoSignIn: false
    },
    baseURL: process.env.BETTER_AUTH_URL,
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        },
    },
    session: {
        cookieCache: {
            enabled: true,
            strategy: 'jwt',
            maxAge: 7 * 24 * 60 * 60
        }
    },
    plugins: [
        jwt(),
    ]
});