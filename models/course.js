import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
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
  uni: {
    type: String,
    required: true,
    trim: true,
  },
  faculty: {
    type: String,
    required: true,
    trim: true,
  },
  no_of_reviews: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    required: true,
  },
  term: [
    {
      type: String,
    },
  ],
  requirements: [
    {
      type: mongoose.Schema.Types.ObjectId,
      course_type: String,
      ref: 'Course',
      unique: true,
    },
  ],
  assessments: [
    {
      name: {
        type: String,
        required: true,
      },
      percentage: {
        type: Number,
        required: true,
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
