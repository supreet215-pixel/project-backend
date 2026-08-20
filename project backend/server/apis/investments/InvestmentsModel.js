const mongoose = require("mongoose");

const investmentsSchema = new mongoose.Schema(
  {
    pitchId: { type: mongoose.Schema.Types.ObjectId, ref: "pitch" },
    investorId: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    amount: { type: Number },
    equityPercent: { type: Number },
    status: { type: String, default: "Pending" }, // "Pending", "Approved", "Rejected", "Paid"
    paymentId: { type: String, default: "" },
    paymentDate: { type: Date },
    created_at: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("investments", investmentsSchema);
