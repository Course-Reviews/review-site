import moongoose from 'moongoose';

const reviewSchema = new moongoose.Schema({
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
  created_date: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: moongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
});

const Review = moongoose.model('Review', reviewSchema);

export default Review;
