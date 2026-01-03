import mongoose from "mongoose";

const PaymentSchema = new mongoose.Schema({
  siteSlug: { type: String, index: true },
  templateKey: String,
  amount: Number,
  provider: { type: String, default: "pakasir" },
  orderId: { type: String, unique: true, index: true },
  invoiceId: { type: String, default: "" },
  method: { type: String, default: "qris" },
  status: { type: String, enum: ["pending", "paid", "failed"], default: "pending" },
  raw: { type: Object, default: {} }
}, { timestamps: true });

export const Payment = mongoose.model("Payment", PaymentSchema);
