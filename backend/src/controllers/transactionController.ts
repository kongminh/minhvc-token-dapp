import { Request, Response } from 'express';
import Transaction from '../models/transactionModel';

export const getTransactions = async (req: Request, res: Response) => {
  const { address } = req.params;
  try {
    const transactions = await Transaction.find({
      $or: [{ from: address }, { to: address }],
    }).sort({ timestamp: -1 }).limit(10);
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export const createTransaction = async (req: Request, res: Response) => {
  const { hash, from, to, value, timestamp } = req.body;
  try {
    const newTransaction = new Transaction({ hash, from, to, value, timestamp });
    await newTransaction.save();
    res.status(201).json(newTransaction);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
