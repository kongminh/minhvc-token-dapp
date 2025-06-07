import mongoose, { Document, Schema } from 'mongoose';

export interface ITransaction extends Document {
  hash: string;
  from: string;
  to: string;
  value: number;
  timestamp: Date;
}

const transactionSchema: Schema = new Schema({
  hash: { type: String, required: true, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  value: { type: Number, required: true },
  timestamp: { type: Date, required: true },
});

export default mongoose.model<ITransaction>('Transaction', transactionSchema);
