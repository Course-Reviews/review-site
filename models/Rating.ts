import {Schema, model} from 'mongoose';

const ratingSchema = new Schema(
  {
    user_id: {
      type: String,
      required: true,
    },
    post_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Review',
    },
    course_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
    positive: {
      type: Boolean
    }
  },
  {
    timestamps: true,
  }
);

// mongoose.models = {};

const Rating = model('Rating', ratingSchema);

export default Rating;
