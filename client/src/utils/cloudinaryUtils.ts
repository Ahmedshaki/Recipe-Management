export const uploadToCloudinary = async(file:any) =>{
    const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/dcrsiwtz7/image/upload`;
    const uploadPreset = "my_unsigned_preset"; 

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try{
        const response = await fetch(CLOUDINARY_URL, {
            method: "POST",
            body: formData,
          });

          if (!response.ok) {
            throw new Error("Failed to upload image to Cloudinary");
          }

          const data = await response.json();
          return data.secure_url;
    }
    catch(error){
        console.error("Image upload failed:", error);
        throw error;
    }
}