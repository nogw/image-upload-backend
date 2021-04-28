"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var image_controller_1 = __importDefault(require("./image.controller"));
var router = express_1.Router();
router.route("/")
    .post(image_controller_1.default.uploadImage);
router.route("/:id")
    .get(image_controller_1.default.getImage);
exports.default = router;
