import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  uni: {
    type: String,
    trim: true,
  },
  content: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
  },
});

mongoose.models = {};

const Feedback = mongoose.model('Feedback', feedbackSchema);

export default Feedback;
