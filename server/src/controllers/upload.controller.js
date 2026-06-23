import cloudinary from '../config/cloudinary.js';

export const generateUploadSignature = async (req, res) => {

  const timestamp = Math.round(Date.now() / 1000);

  const params = {
    folder: req.body.folder
  };

  const signature = cloudinary.utils.api_sign_request(
    params,
    process.env.CLOUDINARY_API_SECRET
  );

  res.json({
    timestamp,
    signature,
    params
  });
};

export const deleteAsset = async (req, res) => {

  const { publicId } = req.body;

  const result = await cloudinary.uploader.destroy(publicId);

  res.json(result);
};