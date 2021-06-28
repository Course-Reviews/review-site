import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema( { name: String }, { collection: 'Review' },
  {
    taken_date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
    },
    course_rating: {
      type: Number,
      required: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
