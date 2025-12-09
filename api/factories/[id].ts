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
        return res.status(400).json({ error: 'Factory ID is required' });
    }

    try {
        if (req.method === 'GET') {
            const factory = await storage.getFactory(id);
            if (!factory) {
                return res.status(404).json({ error: 'Factory not found' });
            }
            return res.status(200).json(factory);
        }

        if (req.method === 'PATCH') {
            const factory = await storage.updateFactory(id, req.body);
            if (!factory) {
                return res.status(404).json({ error: 'Factory not found' });
            }
            return res.status(200).json(factory);
        }

        if (req.method === 'DELETE') {
            const deleted = await storage.deleteFactory(id);
            if (!deleted) {
                return res.status(404).json({ error: 'Factory not found' });
            }
            return res.status(204).end();
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
