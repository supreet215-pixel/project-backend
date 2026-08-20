const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: "dcmev5sko",
  api_key: "223839878985217",
  api_secret: "LmyTPew71HNGso0E3hG0F7bi080",
  secure: true,
  cdn_subdomain: true,
});

const uploadImg = async (fileBuffer, publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          public_id: publicId,
          resource_type: "auto",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result.secure_url);
          }
        },
      )
      .end(fileBuffer);
  });
};

module.exports = { uploadImg };
