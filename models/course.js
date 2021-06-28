import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  uni: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  lecturers: {
    type: String,
    required: true,
  },
});

courseSchema.virtual('reviews', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'owner',
});

mongoose.models = {};

const Course = mongoose.model('Course', courseSchema);

export default Course;
