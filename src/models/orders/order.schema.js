import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  customerId: { type: String, required: true },
  products: [
    {
      productId: { type: String, required: true },
      quantity: { type: Number, required: true },
      priceAtPurchase: { type: Number, required: true }
    }

  ],
  totalAmount: { type: Number, required: true },
  orderDate: { type: Date, required: true },
  status: { type: String, required: true, enum: ['canceled', 'completed', 'pending'] }
});

const OrderDAO = mongoose.model('orders', OrderSchema);

export default OrderDAO;
