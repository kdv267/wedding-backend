import mongoose from 'mongoose';

const Guest = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  is_confirmed: { type: Boolean },
  is_parking: { type: Boolean },
});

export default mongoose.model('Guest', Guest);
