import mongoose from 'mongoose'
const Schema = mongoose.Schema

const imageSchema = new mongoose.Schema({
  size: { type: Number },
  originalName: { type: String },
  mimeType: { type: String },
  path: { type: String },
  generatedFileName: { type: String },
  uploadedAt: { type: Date },
});

export default mongoose.model('Image', imageSchema);