import moongoose from 'moongoose';

const reviewSchema = new moongoose.Schema(
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
      type: moongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Course',
    },
  },
  {
    timestamps: true,
  }
);

const Review = moongoose.model('Review', reviewSchema);

export default Review;
