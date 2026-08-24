import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema(
  {
    egId: { type: String, required: true, unique: true, index: true },
    name: { type: String, required: true, trim: true },
    company: { type: String, required: true, trim: true },
    country: { type: String, required: true },
    countryCode: { type: String, required: true },
    state: { type: String, trim: true, default: '' },
    city: { type: String, required: true, trim: true },
    website: { type: String, trim: true, default: '' },
    contact: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    products: { type: [String], default: [] },
    brand: { type: String, required: true },
    assoc: { type: String, enum: ['none', 'member'], default: 'none' },
    assocName: { type: String, trim: true, default: '' },
  },
  { timestamps: { createdAt: 'joinedAt', updatedAt: false } }
);

memberSchema.index({ name: 'text', company: 'text', city: 'text', state: 'text' });

const Member = mongoose.model('Member', memberSchema);

export default Member;
