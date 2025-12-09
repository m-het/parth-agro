import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from '../_lib/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    const { id } = req.query;
    if (!id || typeof id !== 'string') {
        return res.status(400).json({ error: 'Cold storage ID is required' });
    }

    try {
        if (req.method === 'GET') {
            const coldStorage = await storage.getColdStorage(id);
            if (!coldStorage) {
                return res.status(404).json({ error: 'Cold storage not found' });
            }
            return res.status(200).json(coldStorage);
        }

        if (req.method === 'PATCH') {
            const coldStorage = await storage.updateColdStorage(id, req.body);
            if (!coldStorage) {
                return res.status(404).json({ error: 'Cold storage not found' });
            }
            return res.status(200).json(coldStorage);
        }

        if (req.method === 'DELETE') {
            const deleted = await storage.deleteColdStorage(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Cold storage not found' });
            }
            return res.status(204).end();
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
