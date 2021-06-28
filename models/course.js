import mongoose from 'moongoose';

const courseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
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
  }
});

courseSchema.virtual('reviews', {
  ref: 'Review',
  localfield: '_id',
  foreignfield: 'owner',
});

const Course = moongoose.mode('Course', courseSchema);

export default Course;
