import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/database/User';

export class AuthService {
  async register(username: string, email: string, password: string): Promise<IUser> {
    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      throw new Error('User already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      username,
      email,
      password: hashedPassword,
      createdAt: new Date()
    });

    await user.save();
    return user;
  }

  async login(email: string, password: string): Promise<string> {
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id }, 
      process.env.JWT_SECRET || 'default_secret', 
      { expiresIn: process.env.JWT_EXPIRATION || '1h' }
    );

    return token;
  }
}

export default new AuthService(); 