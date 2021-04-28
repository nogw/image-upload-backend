import multer from 'multer'
import { v4 as uuidv4 } from 'uuid'
import { access, constants, mkdir } from 'fs'
import path from 'path'
import mongoose from 'mongoose'
require('dotenv').config()

export const uploadDir = path.resolve(__dirname, '..', 'public/uploads')
export const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    access(uploadDir, constants.F_OK ,(err) => {
      if (err) {
        mkdir(uploadDir, { recursive : true }, (error) => {
          cb(error, uploadDir);
        });
      } else{
          cb(null, uploadDir);
      }
    });
  },
  filename: (req, file, cb) => {
    const fileName = `${uuidv4()}-${file.originalname}`;
    cb(null, fileName);
  },
});

export const upload = multer({
  storage: storage
}).array("fileUpload", 10)