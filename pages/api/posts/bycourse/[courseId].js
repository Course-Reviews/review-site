// a post request for a post on a course (needs the course id)
import RateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import MongoStore from 'rate-limit-mongo';
import connectDB from '../../../../db/mongoose';
import initMiddleware from '../../../../middleware/initMiddleware';
import Review from '../../../../models/review';

const limiter = initMiddleware(
  new RateLimit({
    store: new MongoStore({
      uri: process.env.MONGO_URI,
      // should match windowMs
      expireTimeMs: 60 * 60 * 1000,
      errorHandler: console.error.bind(null, 'rate-limit-mongo'),
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
      owner: mongoose.Types.ObjectId(req.query.courseId),
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
        owner: req.query.courseId,
      }).lean()

      const overallRating = reviews.reduce((p, c) => p + c.course_rating, 0) / reviews.length;
      const overallRelaxedRating =
        reviews.reduce((p, c) => p + (c.relaxed_rating || (5 - c.workload_rating) + 2), 0) / reviews.length;
      const overallEnjoymentRating =
        reviews.reduce((p, c) => p + (c.enjoyment_rating || Math.max(c.content_rating - 1, 1)), 0) / reviews.length;
      const overallDeliveryRating =
        reviews.reduce((p, c) => p + c.delivery_rating, 0) / reviews.length;

      const data = {
        num_ratings: reviews.length,
        overall_rating: overallRating,
        enjoyment_rating: overallEnjoymentRating,
        relaxed_rating: overallRelaxedRating,
        delivery_rating: overallDeliveryRating,
        reviews: reviews.filter((r) => r?.content !== undefined && r?.content !== ''),
      };

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e.errors.content.properties.message);
    }
  }
};

export default handler;