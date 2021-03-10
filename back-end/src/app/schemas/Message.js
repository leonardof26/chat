import mongoose from 'mongoose'

const MessageSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    room: { type: String, required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export default mongoose.model('Message', MessageSchema)
