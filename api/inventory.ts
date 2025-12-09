import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_lib/storage';
import { insertInventorySchema } from './_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const { storageId, farmerId } = req.query;
            let items;
            if (storageId && typeof storageId === 'string') {
                items = await storage.getInventoryByStorage(storageId);
            } else if (farmerId && typeof farmerId === 'string') {
                items = await storage.getInventoryByFarmer(farmerId);
            } else {
                items = await storage.getInventory();
            }
            return res.status(200).json(items);
        }

        if (req.method === 'POST') {
            const result = insertInventorySchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error.issues });
            }
            const item = await storage.createInventory(result.data);
            return res.status(201).json(item);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
