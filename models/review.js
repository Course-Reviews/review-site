import moongoose from 'moongoose';

const reviewSchema = new moongoose.Schema({
  taken_date: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: false,
  },
  rating: {
    type: Number,
    required: true,
  },
  owner: {
    type: Moongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Course',
  },
});

const Review = moongoose.model('Review', reviewSchema);

export default Review;
