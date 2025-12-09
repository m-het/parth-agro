import type { VercelRequest, VercelResponse } from '@vercel/node';
import { connectDB } from '../_lib/db';
import { User } from '../_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ authenticated: false });
        }

        const token = authHeader.split(' ')[1];
        const decoded = Buffer.from(token, 'base64').toString('utf-8');
        const [userId] = decoded.split(':');

        if (!userId) {
            return res.status(401).json({ authenticated: false });
        }

        await connectDB();
        const user = await User.findById(userId);

        if (!user) {
            return res.status(401).json({ authenticated: false });
        }

        return res.status(200).json({
            authenticated: true,
            user: {
                id: (user._id as any).toString(),
                username: user.username,
                role: user.role || 'admin',
            },
        });
    } catch (error) {
        console.error('Auth Check Error:', error);
        return res.status(401).json({ authenticated: false });
    }
}
