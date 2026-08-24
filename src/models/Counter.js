import mongoose from 'mongoose';

// Used to atomically hand out sequential EG IDs (EG-<country>-<category>-000001)
// without two simultaneous signups colliding on the same number.
const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // e.g. "member-id"
  seq: { type: Number, default: 0 },
});

const Counter = mongoose.model('Counter', counterSchema);

export async function nextSequence(name) {
  const doc = await Counter.findByIdAndUpdate(
    name,
    { $inc: { seq: 1 } },
    { new: true, upsert: true }
  );
  return doc.seq;
}

export default Counter;
