import dotenv from 'dotenv';
dotenv.config();

const configs = {
    PORT: process.env.PORT,
    ENV: process.env.ENV,
    MONGODB_URI: process.env.MONGODB_URI,
    DB_URI: process.env.DB_URI,
    CLOUD_NAME: process.env.CLOUDINARY_NAME,
    CLOUD_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUD_API_SECRET: process.env.CLOUDINARY_API_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
    SALT: process.env.HASH_SALT,
    JWT_SECRET: process.env.JWT_SECRET
}

export default configs;