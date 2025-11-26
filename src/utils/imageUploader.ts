import cloudinary from "cloudinary";
cloudinary.v2.config({
  secure: true,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
});
export const imageUploader = async (
  paths: string | string[],
  publicIds: string | string[],
  overwrite: boolean
) => {
  try {
    const pathArray = Array.isArray(paths) ? paths : [paths];
    const publicIdArray = Array.isArray(publicIds) ? publicIds : [publicIds];

    if (pathArray.length !== publicIdArray.length) {
      throw new Error("Number of paths and public IDs must match.");
    }

    const uploadPromises = pathArray.map((path, index) =>
      cloudinary.v2.uploader.upload(path, {
        public_id: publicIdArray[index],
        overwrite: overwrite,
      })
    );

    const results = await Promise.all(uploadPromises);

    for (const result of results) {
      if (result.error) {
        throw result.error;
      }
    }

    return results;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
