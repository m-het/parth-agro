import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_lib/storage';
import { insertFarmerSchema } from './_lib/schema';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PATCH,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const farmers = await storage.getFarmers();
            return res.status(200).json(farmers);
        }

        if (req.method === 'POST') {
            const result = insertFarmerSchema.safeParse(req.body);
            if (!result.success) {
                return res.status(400).json({ error: result.error.issues });
            }
            const farmer = await storage.createFarmer(result.data);
            return res.status(201).json(farmer);
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
