import mongoose, { Schema, Document } from 'mongoose';
import { z } from 'zod';

// Farmer Schema
const farmerSchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    village: { type: String, required: true },
    district: { type: String, required: true },
    farmSize: { type: Number, required: true },
    potatoVariety: { type: String, required: true },
    status: { type: String, default: 'pending' },
}, { timestamps: true });

// Factory Schema
const factorySchema = new Schema({
    name: { type: String, required: true },
    contactPerson: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    location: { type: String, required: true },
    monthlyRequirement: { type: Number, required: true },
    status: { type: String, default: 'active' },
}, { timestamps: true });

// Cold Storage Schema
const coldStorageSchema = new Schema({
    name: { type: String, required: true },
    location: { type: String, required: true },
    capacity: { type: Number, required: true },
    currentStock: { type: Number, default: 0 },
    temperature: { type: String, default: '3.2' },
    humidity: { type: String, default: '88' },
    status: { type: String, default: 'online' },
}, { timestamps: true });

// Inventory Schema
const inventorySchema = new Schema({
    farmerId: { type: String, required: true },
    storageId: { type: String, required: true },
    quantity: { type: Number, required: true },
    variety: { type: String, required: true },
    grade: { type: String, required: true },
    entryDate: { type: String, required: true },
    status: { type: String, default: 'stored' },
}, { timestamps: true });

// Contact Inquiry Schema
const contactInquirySchema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String },
    type: { type: String, required: true },
    message: { type: String, required: true },
    status: { type: String, default: 'new' },
}, { timestamps: true });

// Models
export const Farmer = mongoose.models.Farmer || mongoose.model('Farmer', farmerSchema);
export const Factory = mongoose.models.Factory || mongoose.model('Factory', factorySchema);
export const ColdStorage = mongoose.models.ColdStorage || mongoose.model('ColdStorage', coldStorageSchema);
export const Inventory = mongoose.models.Inventory || mongoose.model('Inventory', inventorySchema);
export const ContactInquiry = mongoose.models.ContactInquiry || mongoose.model('ContactInquiry', contactInquirySchema);

// Zod Schemas for Validation
export const insertFarmerSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    village: z.string().min(1),
    district: z.string().min(1),
    farmSize: z.number().positive(),
    potatoVariety: z.string().min(1),
});

export const insertFactorySchema = z.object({
    name: z.string().min(1),
    contactPerson: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email(),
    location: z.string().min(1),
    monthlyRequirement: z.number().positive(),
});

export const insertColdStorageSchema = z.object({
    name: z.string().min(1),
    location: z.string().min(1),
    capacity: z.number().positive(),
    temperature: z.string().optional(),
    humidity: z.string().optional(),
});

export const insertInventorySchema = z.object({
    farmerId: z.string().min(1),
    storageId: z.string().min(1),
    quantity: z.number().positive(),
    variety: z.string().min(1),
    grade: z.string().min(1),
    entryDate: z.string().min(1),
});

export const insertContactInquirySchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    email: z.string().email().optional(),
    type: z.string().min(1),
    message: z.string().min(1),
});

// TypeScript Types
export type Farmer = { id: string; name: string; phone: string; village: string; district: string; farmSize: number; potatoVariety: string; status: string };
export type Factory = { id: string; name: string; contactPerson: string; phone: string; email: string; location: string; monthlyRequirement: number; status: string };
export type ColdStorage = { id: string; name: string; location: string; capacity: number; currentStock: number; temperature: string; humidity: string; status: string };
export type Inventory = { id: string; farmerId: string; storageId: string; quantity: number; variety: string; grade: string; entryDate: string; status: string };
export type ContactInquiry = { id: string; name: string; phone: string; email?: string; type: string; message: string; status: string };
