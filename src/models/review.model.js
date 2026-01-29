import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  rating: {
    type: Number,
    required: [true, 'Vui lòng chọn điểm đánh giá'],
    min: 1,
    max: 10
  },
  comment: {
    type: String,
    maxlength: 1000
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
  },
  { timestamps: true, 
    versionKey: false
});
reviewSchema.index({ user: 1, movie: 1 }, { unique: true });
const Review = mongoose.model("Review", reviewSchema);

export default Review;