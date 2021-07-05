import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
  {
    taken_date: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      validate(value) {
        if (value.length > 5000) {
          throw new Error('The character limit is 5000');
        }
      },
    },
    course_rating: {
      type: Number,
      required: true,
    },
    content_rating: {
      type: Number,
      required: true,
    },
    workload_rating: {
      type: Number,
      required: true,
    },
    delivery_rating: {
      type: Number,
      required: true,
    },
    upvote: {
      type: Number,
      default: 0,
    },
    downvote: {
      type: Number,
      default: 0,
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
