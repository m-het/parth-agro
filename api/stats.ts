import type { VercelRequest, VercelResponse } from '@vercel/node';
import { storage } from './_lib/storage';

export default async function handler(req: VercelRequest, res: VercelResponse) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {
        if (req.method === 'GET') {
            const farmers = await storage.getFarmers();
            const factories = await storage.getFactories();
            const coldStorages = await storage.getColdStorages();
            const inventory = await storage.getInventory();

            const totalCapacity = coldStorages.reduce((sum, s) => sum + s.capacity, 0);
            const totalStock = coldStorages.reduce((sum, s) => sum + s.currentStock, 0);
            const totalInventory = inventory.reduce((sum, i) => sum + i.quantity, 0);

            return res.status(200).json({
                totalFarmers: farmers.length,
                pendingFarmers: farmers.filter((f) => f.status === 'pending').length,
                approvedFarmers: farmers.filter((f) => f.status === 'approved').length,
                totalFactories: factories.length,
                activeFactories: factories.filter((f) => f.status === 'active').length,
                totalColdStorages: coldStorages.length,
                onlineStorages: coldStorages.filter((s) => s.status === 'online').length,
                totalCapacity,
                totalStock,
                totalInventory,
                utilizationPercent: totalCapacity > 0 ? Math.round((totalStock / totalCapacity) * 100) : 0,
            });
        }

        return res.status(405).json({ error: 'Method not allowed' });
    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
