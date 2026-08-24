import mongoose from 'mongoose';

const contactEnquirySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    company: { type: String, trim: true, default: '' },
    email: { type: String, required: true, trim: true, lowercase: true },
    phone: { type: String, required: true, trim: true },
    category: { type: String, trim: true, default: '' },
    message: { type: String, trim: true, default: '' },
  },
  { timestamps: { createdAt: 'submittedAt', updatedAt: false } }
);

const ContactEnquiry = mongoose.model('ContactEnquiry', contactEnquirySchema);

export default ContactEnquiry;
