import mongoose from "mongoose";

const bookingSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Vui lòng đăng nhập để đặt vé"],
    },
    showtime: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Showtime",
      required: [true, "Vui lòng chọn suất chiếu"],
    },
    seats: [
      {
        seatNumber: {
          type: String,
          required: true,
        },
        type: {
          type: String,
          enum: ["Standard", "VIP", "Couple"],
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
      min: 0,
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      enum: ["cash", "credit_card", "momo", "zalopay", "vnpay"],
      default: "cash",
    },
    paymentStatus: {
      type: String,
      enum: ["unpaid", "paid", "refunded"],
      default: "unpaid",
    },
    bookingCode: {
      type: String,
      unique: true,
      uppercase: true,
    },
    qrCode: {
      type: String,
    },
    notes: {
      type: String,
      maxlength: 500,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    expiresAt: {
      type: Date,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, 
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
});

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
