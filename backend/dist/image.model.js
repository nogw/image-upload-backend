"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var Schema = mongoose_1.default.Schema;
var imageSchema = new mongoose_1.default.Schema({
    size: { type: Number },
    originalName: { type: String },
    mimeType: { type: String },
    path: { type: String },
    generatedFileName: { type: String },
    uploadedAt: { type: Date },
});
exports.default = mongoose_1.default.model('Image', imageSchema);
