import dotenv from 'dotenv';
import { config } from 'cloudinary';

dotenv.config();

const cloudinaryConfig = () => {
  config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

export default cloudinaryConfig;
