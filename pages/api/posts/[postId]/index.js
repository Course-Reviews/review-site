// a post request for a post on a course (work in progress)
import Review from '../../../../models/review';
import mongoose from 'mongoose';
import connectDB from '../../../../db/mongoose';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const review = new Review({
      ...req.body,
      owner: mongoose.Types.ObjectId(req.query.postId),
    });

    try {
      await review.save();
      res.status(201).json(review);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};

export default handler;
