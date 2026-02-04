import { uploadImage } from "../Services/Cloudinary.Service"

const ValidatorUtils = {
    isValidUrl: (url: string) => {
        if (!url || url.trim() === '') return false
        try {
            new URL(url)
            return true
        } catch (error) {
            return false
        }
    }, isValidBase64: (base64: string) => {
        if (!base64 || base64.trim() === '') return false
        try {
            const check = Buffer.from(base64, 'base64').toString('utf-8')
            return check
        } catch (error) {
            return false
        }
    }, convertToUrl: async (image: string) => {
        if (!image || image.trim() === '') return null
        if (ValidatorUtils.isValidUrl(image)) return image
        if (ValidatorUtils.isValidBase64(image)) return await uploadImage(image)
        return null
    }
}
export default ValidatorUtils