import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
  },
  pageId : {
    type: String,
    required: true,
    trim: true,
  },
  university: {
    type: String,
    required: true,
    trim: true,
  },
  faculty: {
    type: String,
    required: true,
    trim: true,
  },
  rating: {
    type: Number,
  },
  no_of_reviews: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
  },
  requirements: {
    type: String,
  },
  term: [
    {
      type: Number,
    },
  ],
  assessments: [
    {
      name: {
        type: String,
      },
      percentage: {
        type: Number,
      },
    },
  ],
});

courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'owner',
});

mongoose.models = {};

const Course = mongoose.model('Course', courseSchema);

export default Course;
