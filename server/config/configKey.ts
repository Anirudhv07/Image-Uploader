import dotenv from 'dotenv'

dotenv.config()

export const configKeys={
    PORT:process.env.PORT as string,
    MONGO_URL:process.env.MONGO_URL as string,
    JWT_SECRET_KEY:process.env.JWT_SECRET_KEY as string,
    CLOUDINARY_API_KEY:process.env.CLOUDINARY_API_KEY as string,
    CLOUDINARY_API_SECRET:process.env.CLOUDINARY_API_SECRET as string,
}