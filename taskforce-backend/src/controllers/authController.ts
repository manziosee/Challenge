import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { sendEmail } from '../utils/email';

export const register = async (req: Request, res: Response): Promise<Response | void> => {
  const { name, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();

    // Generate a random code for the email
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Send registration confirmation email with the code
    await sendEmail(email, 'Welcome to TaskForce Wallet', code);

    res.status(201).json({ message: 'User registered successfully' });
  } catch {
    res.status(500).json({ error: 'Error registering user' });
  }
};

export const login = async (req: Request, res: Response): Promise<Response | void> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.json({ token });
  } catch {
    res.status(500).json({ error: 'Error logging in' });
  }
};

export const changePassword = async (req: Request, res: Response): Promise<Response | void> => {
  const { userId } = req.user!;
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Current password is incorrect' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password changed successfully' });
  } catch {
    res.status(500).json({ error: 'Error changing password' });
  }
};

// Placeholder for updateProfile function
export const updateProfile = async (req: Request, res: Response): Promise<Response | void> => {
  // Add your implementation for updating user profile
};

// Placeholder for logout function
export const logout = async (req: Request, res: Response): Promise<Response | void> => {
  // Add your implementation for logging out the user
  // For example, you might want to invalidate the JWT token
};