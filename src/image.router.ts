import { Router } from "express";
import imageCtrl from './image.controller'

const router = Router()

router.route("/")
  .post(imageCtrl.uploadImage)

router.route("/:id")
  .get(imageCtrl.getImage)

export default router