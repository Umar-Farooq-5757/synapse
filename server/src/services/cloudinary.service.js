import cloudinary from '../config/cloudinary.js';

class CloudinaryService {

  /**
   * Generate signed upload signature
   */
  generateUploadSignature(folder = 'lms') {
    const timestamp = Math.round(Date.now() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        folder
      },
      process.env.CLOUDINARY_API_SECRET
    );

    return {
      timestamp,
      signature,
      folder,
      apiKey: process.env.CLOUDINARY_API_KEY,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME
    };
  }

  /**
   * Delete asset
   */
  async deleteAsset(publicId, resourceType = 'image') {
    return await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType
    });
  }

  /**
   * Generate normal image URL
   */
  getImageUrl(publicId) {
    return cloudinary.url(publicId, {
      secure: true
    });
  }

  /**
   * Generate transformed thumbnail URL
   */
  getThumbnailUrl(publicId) {
    return cloudinary.url(publicId, {
      width: 400,
      height: 225,
      crop: 'fill',
      secure: true
    });
  }

  /**
   * Generate video URL
   */
  getVideoUrl(publicId) {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      secure: true
    });
  }

  /**
   * Generate video thumbnail URL
   */
  getVideoThumbnail(publicId) {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      start_offset: '5',
      format: 'jpg',
      secure: true
    });
  }

  /**
   * Generate streaming URL
   */
  getStreamingVideoUrl(publicId) {
    return cloudinary.url(publicId, {
      resource_type: 'video',
      streaming_profile: 'hd',
      secure: true
    });
  }

  /**
   * Generate PDF URL
   */
  getPdfUrl(publicId) {
    return cloudinary.url(publicId, {
      resource_type: 'raw',
      secure: true
    });
  }

  /**
   * Generate PDF preview image
   */
  getPdfPreview(publicId) {
    return cloudinary.url(publicId, {
      page: 1,
      format: 'jpg',
      secure: true
    });
  }

  /**
   * Generate signed delivery URL
   * Useful later for paid/private courses
   */
  getSignedUrl(publicId, options = {}) {
    return cloudinary.url(publicId, {
      secure: true,
      sign_url: true,
      ...options
    });
  }

  /**
   * Get asset details from Cloudinary
   */
  async getAsset(publicId, resourceType = 'image') {
    return await cloudinary.api.resource(publicId, {
      resource_type: resourceType
    });
  }
}

export default new CloudinaryService();