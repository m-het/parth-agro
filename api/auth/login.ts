import type { VercelRequest, VercelResponse } from '@vercel/node';
import bcrypt from 'bcryptjs';
import { connectDB } from '../_lib/db';
import { User } from '../_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { username, password } = req.body;

        if (!username && !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        if (!username) {
            return res.status(400).json({ error: 'Username is required' });
        }
        if (!password) {
            return res.status(400).json({ error: 'Password is required' });
        }

        await connectDB();
        const user = await User.findOne({ username });

        if (!user) {
            return res.status(401).json({ error: 'Incorrect username' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        // For serverless, we'll use a simple token-based approach
        // In production, consider using JWT or a proper session store
        const token = Buffer.from(`${user._id}:${Date.now()}`).toString('base64');

        return res.status(200).json({
            success: true,
            token,
            user: {
                id: (user._id as any).toString(),
                username: user.username,
                role: user.role || 'admin',
            },
        });
    } catch (error) {
        console.error('Login Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
