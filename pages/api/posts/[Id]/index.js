// a post request for a post on a course (needs the course id)
import mongoose from 'mongoose';
import Review from '../../../../models/review';
import connectDB from '../../../../db/mongoose';
import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import initMiddleware from '../../../../middleware/initMiddleware';

const limiter = initMiddleware(
  new RateLimit({
    store: new MongoStore({
      uri: process.env.MONGO_URI,
      // should match windowMs
      expireTimeMs: 60 * 60 * 1000,
      errorHandler: console.error.bind(null, 'rate-limit-mongo')
      // see Configuration section for more options and details
    }),
    windowMs: 60 * 60 * 1000,
    max: 20,
  })
);

connectDB();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await limiter(req, res);

    const review = new Review({
      ...req.body,
      owner: mongoose.Types.ObjectId(req.query.Id),
    });

    try {
      await review.save();
      res.status(201).json(review);
    } catch (e) {
      res.status(400).json(e.errors.content.properties.message);
    }
  }
  if (req.method === 'GET') {
    // Fetch all reviews for a given course

    try {
      const reviews = await Review.find({
        owner: req.query.Id,
        content: {$exists:true}
      });
      res.status(200).json(reviews);
    } catch (e) {
      res.status(400).json(e.errors.content.properties.message);
    }
  }

};

export default handler;
