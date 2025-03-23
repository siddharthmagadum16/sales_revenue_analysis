import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  location: { type: String },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true }
});

const CustomerDAO = mongoose.model('customers', CustomerSchema);

export default CustomerDAO;
