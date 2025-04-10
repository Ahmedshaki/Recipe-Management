const cloudinary = require('../config/cloudinary');

const uploadImageToCloudinary = async (image) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(image, {
      folder: 'recipe_images',
    });
    return uploadResponse.secure_url;
  } catch (error) {
    throw new Error('Image upload failed');
  }
};

module.exports = uploadImageToCloudinary;
