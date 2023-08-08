import { BadRequestError } from "../../helpers/errors";

const MAX_PROFILE_IMAGE_SIZE = 512 * 512; // 1 MB"
const ALLOWED_IMAGE_EXTENSIONS = [".jpg", ".jpeg", ".png"];

export const validateProfileImage = (profileImage: File): File | undefined => {
   if (profileImage) {
      // check file size
      if (profileImage.size > MAX_PROFILE_IMAGE_SIZE) {
         throw new BadRequestError(
            "Profile image size exceeds the maximum allowed size of 1 MB"
         );
      }
      // check file extension
      const fileExtension = profileImage.name.slice(
         profileImage.name.lastIndexOf(".")
      );
      if (!ALLOWED_IMAGE_EXTENSIONS.includes(fileExtension.toLowerCase())) {
         throw new BadRequestError(
            "Profile image must be a JPG, JPEG, or PNG file"
         );
      }
      return profileImage;
   }
};
