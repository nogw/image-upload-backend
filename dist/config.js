"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = exports.storage = exports.uploadDir = void 0;
var multer_1 = __importDefault(require("multer"));
var uuid_1 = require("uuid");
var fs_1 = require("fs");
var path_1 = __importDefault(require("path"));
require('dotenv').config();
exports.uploadDir = path_1.default.resolve(__dirname, '..', 'public/uploads');
exports.storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        fs_1.access(exports.uploadDir, fs_1.constants.F_OK, function (err) {
            if (err) {
                fs_1.mkdir(exports.uploadDir, { recursive: true }, function (error) {
                    cb(error, exports.uploadDir);
                });
            }
            else {
                cb(null, exports.uploadDir);
            }
        });
    },
    filename: function (req, file, cb) {
        var fileName = uuid_1.v4() + "-" + file.originalname;
        cb(null, fileName);
    },
});
exports.upload = multer_1.default({
    storage: exports.storage
}).array("fileUpload", 10);
