import { request, Request, Response } from 'express'
import * as config from './config'
import Image from './image.model'
import path from 'path'

declare module 'express' {
  interface Request {
    files: any
  }
}

const uploadImage = (req: Request, res: Response) => {
  config.upload(req, res, (err: string) => {
    if (err) {
      console.log(err)
      res.status(400).json({
        data: `Error occured: ${err}`
      })
    } else {
      const images = req.files.map((file: any) => {
        return {
          originalName: file.originalname,
          size: file.size,
          mimeType: file.mimetype,
          path: file.path,
          generatedFileName: file.filename,
          uploadedAt: new Date(),
        };
      });

      Image.insertMany(images)
        .then((docs: any) => {
          const imageURLs = docs.map((doc: any) => {
            return { url: `http:localhost:8000/${doc._id}`, name: doc.originalName };
          })
          console.log(docs)
          res.status(201).json({
            imageURLs
          })
        })
        .catch((error) => {
          console.log(error)
          res.status(400).end()
        })
    }
  })
}

const getImage = async ( req: Request, res: Response ) => {
  try {
    const doc: any = await Image.findOne({ _id: req.params.id }).lean().exec();
 
    if (!doc) {
      res.status(404).json({ req: req.params.id })
    }
    
    const imageURL = path.join(config.uploadDir, doc.generatedFileName)
    res.status(200).sendFile(imageURL)
  } catch (error) {
    console.log(error)
    res.status(400).end()
  }
}

export default {
  uploadImage,
  getImage
}