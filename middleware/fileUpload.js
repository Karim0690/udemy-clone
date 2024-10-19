import multer from "multer";
import AppError from "../utils/appError.js";

let uploads = (folderName) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, `uploads/${folderName}`);
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, uniqueSuffix + "-" + file.originalname);
    },
  });

  function fileFilter(req, file, cb) {
    const allowedMimeTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "video/mp4",
      "video/mkv",
    ];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new AppError("Only images and videos are allowed"), false);
    }
  }

  return multer({ storage, fileFilter });
};

export const uploadFile = (fieldName, folderName) => {
  return uploads(folderName).single(fieldName);
};

export const uploadManyFile = (arrayOfFields, folderName) => {
  return uploads(folderName).fields(arrayOfFields);
};
