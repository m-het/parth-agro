import { connectDB } from './db';
import { Farmer, Factory, ColdStorage, Inventory, ContactInquiry } from './schema';
import type * as schema from './schema';

// Helper to convert MongoDB document to plain object with id
function toPlainObject<T>(doc: any): T & { id: string } {
    if (!doc) return doc;
    const obj = doc.toObject ? doc.toObject() : doc;
    return {
        ...obj,
        id: obj._id?.toString() || obj.id,
    };
}

function toPlainArray<T>(docs: any[]): (T & { id: string })[] {
    return docs.map(doc => toPlainObject<T>(doc));
}

// Storage operations for Vercel serverless functions
export const storage = {
    // Farmers
    async getFarmers(): Promise<schema.Farmer[]> {
        await connectDB();
        const farmers = await Farmer.find();
        return toPlainArray(farmers);
    },

    async getFarmer(id: string): Promise<schema.Farmer | undefined> {
        await connectDB();
        const farmer = await Farmer.findById(id);
        return farmer ? toPlainObject(farmer) : undefined;
    },

    async createFarmer(data: Omit<schema.Farmer, 'id' | 'status'>): Promise<schema.Farmer> {
        await connectDB();
        const farmer = await Farmer.create({ ...data, status: 'pending' });
        return toPlainObject(farmer);
    },

    async updateFarmerStatus(id: string, status: string): Promise<schema.Farmer | undefined> {
        await connectDB();
        const farmer = await Farmer.findByIdAndUpdate(id, { status }, { new: true });
        return farmer ? toPlainObject(farmer) : undefined;
    },

    async deleteFarmer(id: string): Promise<boolean> {
        await connectDB();
        const result = await Farmer.findByIdAndDelete(id);
        return !!result;
    },

    // Factories
    async getFactories(): Promise<schema.Factory[]> {
        await connectDB();
        const factories = await Factory.find();
        return toPlainArray(factories);
    },

    async getFactory(id: string): Promise<schema.Factory | undefined> {
        await connectDB();
        const factory = await Factory.findById(id);
        return factory ? toPlainObject(factory) : undefined;
    },

    async createFactory(data: Omit<schema.Factory, 'id' | 'status'>): Promise<schema.Factory> {
        await connectDB();
        const factory = await Factory.create({ ...data, status: 'active' });
        return toPlainObject(factory);
    },

    async updateFactory(id: string, data: Partial<schema.Factory>): Promise<schema.Factory | undefined> {
        await connectDB();
        const factory = await Factory.findByIdAndUpdate(id, data, { new: true });
        return factory ? toPlainObject(factory) : undefined;
    },

    async deleteFactory(id: string): Promise<boolean> {
        await connectDB();
        const result = await Factory.findByIdAndDelete(id);
        return !!result;
    },

    // Cold Storages
    async getColdStorages(): Promise<schema.ColdStorage[]> {
        await connectDB();
        const storages = await ColdStorage.find();
        return toPlainArray(storages);
    },

    async getColdStorage(id: string): Promise<schema.ColdStorage | undefined> {
        await connectDB();
        const storage = await ColdStorage.findById(id);
        return storage ? toPlainObject(storage) : undefined;
    },

    async createColdStorage(data: any): Promise<schema.ColdStorage> {
        await connectDB();
        const storage = await ColdStorage.create({
            name: data.name,
            location: data.location,
            capacity: data.capacity,
            temperature: data.temperature ?? '3.2',
            humidity: data.humidity ?? '88',
            currentStock: 0,
            status: 'online',
        });
        return toPlainObject(storage);
    },

    async updateColdStorage(id: string, data: Partial<schema.ColdStorage>): Promise<schema.ColdStorage | undefined> {
        await connectDB();
        const storage = await ColdStorage.findByIdAndUpdate(id, data, { new: true });
        return storage ? toPlainObject(storage) : undefined;
    },

    async deleteColdStorage(id: string): Promise<boolean> {
        await connectDB();
        const result = await ColdStorage.findByIdAndDelete(id);
        return !!result;
    },

    // Inventory
    async getInventory(): Promise<schema.Inventory[]> {
        await connectDB();
        const items = await Inventory.find();
        return toPlainArray(items);
    },

    async getInventoryByStorage(storageId: string): Promise<schema.Inventory[]> {
        await connectDB();
        const items = await Inventory.find({ storageId });
        return toPlainArray(items);
    },

    async getInventoryByFarmer(farmerId: string): Promise<schema.Inventory[]> {
        await connectDB();
        const items = await Inventory.find({ farmerId });
        return toPlainArray(items);
    },

    async createInventory(data: Omit<schema.Inventory, 'id' | 'status'>): Promise<schema.Inventory> {
        await connectDB();
        const item = await Inventory.create({ ...data, status: 'stored' });
        return toPlainObject(item);
    },

    async updateInventory(id: string, data: Partial<schema.Inventory>): Promise<schema.Inventory | undefined> {
        await connectDB();
        const item = await Inventory.findByIdAndUpdate(id, data, { new: true });
        return item ? toPlainObject(item) : undefined;
    },

    async deleteInventory(id: string): Promise<boolean> {
        await connectDB();
        const result = await Inventory.findByIdAndDelete(id);
        return !!result;
    },

    // Contact Inquiries
    async getContactInquiries(): Promise<schema.ContactInquiry[]> {
        await connectDB();
        const inquiries = await ContactInquiry.find();
        return toPlainArray(inquiries);
    },

    async createContactInquiry(data: any): Promise<schema.ContactInquiry> {
        await connectDB();
        const inquiry = await ContactInquiry.create({
            name: data.name,
            phone: data.phone,
            email: data.email ?? null,
            type: data.type,
            message: data.message,
            status: 'new',
        });
        return toPlainObject(inquiry);
    },

    async updateContactInquiryStatus(id: string, status: string): Promise<schema.ContactInquiry | undefined> {
        await connectDB();
        const inquiry = await ContactInquiry.findByIdAndUpdate(id, { status }, { new: true });
        return inquiry ? toPlainObject(inquiry) : undefined;
    },
};
