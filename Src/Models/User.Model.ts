import mongoose from 'mongoose'
import { IUser } from '../Interfaces/IUser'
const UserSchema = new mongoose.Schema<IUser.Doc>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      match: [/^\+?[1-9]\d{7,14}$/, 'Invalid phone number'],
    },
    firebaseId: {
      type: String,
      unique: true,
      required: [true, 'Firebase User Id required'],
    },
    stripeCustomerId: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      default: "TigerIt User"
    },
    email: {
      type: String,
      unique: true,
      match: [/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, "Invalid Email"],
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'personal'],
    },
    DOB: {
      type: Date,
    },
    verificationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: "pending"
    },
    profileImage: {
      type: String,
      default:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFpMZnvOyb9sdqE7jmOL5PaBa83i0cSuH6Qw&s',
    },
    wallet: {
      balance: {
        amount: {
          type: Number,
          default: 0,
        },
        currency: {
          type: String,
          default: '$',
        },
      },
    }, deliveryAddress: {
      type: String,
      trim: true
    }
  },
  { timestamps: true },
)
const UserModel = mongoose.model<IUser.Doc>('User', UserSchema)
export default UserModel
