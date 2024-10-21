import dotenv, { config } from "dotenv";

dotenv.config()

export default { MongoUrl: process.env.MONGODB_URL, port: process.env.PORT, jwtSecret: process.env.JWT_SECRET, sessionSecret: process.env.SESSION_SECRET }