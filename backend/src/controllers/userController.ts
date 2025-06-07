import { Request, Response } from 'express';
import User from '../models/userModel';

export const getUser = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ address: req.params.address });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export const createUser = async (req: Request, res: Response) => {
  const { address, balance } = req.body;
  try {
    const newUser = new User({ address, balance });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
