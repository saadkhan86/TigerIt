import mongoose from "mongoose"
import { IAdmin } from "../Interfaces/IAdmin"
const AdminSchema = new mongoose.Schema<IAdmin.Doc>({
  name: {
    type: String,
    required: [true, "Admin Name Required"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Admin Email Required"],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Invalid Email",
    ],
  },
  phone: {
    type: String,
    required: [true, "Phone Number Required"],
    unique: true,
    match: [/^\+?[1-9]\d{7,14}$/, "Invalid phone number"],
  },
})
const AdminModel = mongoose.model<IAdmin.Doc>("Admin", AdminSchema)
export default AdminModel
