import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  address: string;
  balance: number;
}

const userSchema: Schema = new Schema({
  address: { type: String, required: true, unique: true },
  balance: { type: Number, required: true },
});

export default mongoose.model<IUser>('User', userSchema);
