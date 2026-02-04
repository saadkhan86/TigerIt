import { v2 as cloudinary } from "cloudinary";
const cloudinaryConfig = () => {
    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
    });
}

const uploadImage = async (image: string) => {
    try {
        const base64String = image.replace(/^data:image\/[a-z]+;base64,/, '')
        const result = await cloudinary.uploader.upload(
            `data:image/jpeg;base64,${base64String}`
        )
        return result.secure_url
    } catch (error) {
        console.log(error)
        return null
    }
}

const deleteImage = async (publicId: string) => {
    try {
        const result = await cloudinary.uploader.destroy(publicId)
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}
export { cloudinaryConfig, uploadImage, deleteImage }