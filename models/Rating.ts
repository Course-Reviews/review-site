import {Schema, model, Model} from 'mongoose';


const schema = {
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
}

const ratingSchema = new Schema(
  schema,
  {
    timestamps: true,
  }
);

// mongoose.models = {};

let Rating: Model<any>;

try {
  Rating = model('Rating')
} catch (error) {
  Rating = model('Rating', ratingSchema)
}

export default Rating;
