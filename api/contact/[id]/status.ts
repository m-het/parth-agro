import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../../_lib/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'PATCH,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Contact inquiry ID is required' });
    }

    try {
        if (req.method === 'PATCH') {
            const { status } = req.body;
            if (!status || typeof status !== 'string') {
                return res.status(400).json({ error: 'Status is required' });
            }
            const inquiry = await storage.updateContactInquiryStatus(id, status);
            if (!inquiry) {
                return res.status(404).json({ error: 'Contact inquiry not found' });
            }
            return res.status(200).json(inquiry);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
