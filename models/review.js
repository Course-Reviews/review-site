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
      min: 1,
      max: 5,
    },
    delivery_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    relaxed_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    enjoyment_rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
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
    user_id: {
      type: String,
    },
    user_name: {
      type: String,
    },
    poster_ip: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.models = {};

const Review = mongoose.model('Review', reviewSchema);

export default Review;
