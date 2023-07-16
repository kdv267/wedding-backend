import mongoose from 'mongoose';

const Guest = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  comment: { type: String},
  music: { type: String},
  drink: { type: Array},
  food: { type: Array},
  is_confirmed: { type: Boolean },

});

export default mongoose.model('Guest', Guest);
