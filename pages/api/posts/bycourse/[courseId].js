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
      });

      const overallRating = reviews.reduce((p, c) => p + c.course_rating, 0) / reviews.length;
      const overallContentRating =
        reviews.reduce((p, c) => p + c.content_rating, 0) / reviews.length;
      const overallWorkloadRating =
        reviews.reduce((p, c) => p + c.workload_rating, 0) / reviews.length;
      const overallDeliveryRating =
        reviews.reduce((p, c) => p + c.delivery_rating, 0) / reviews.length;

      const data = {
        num_ratings: reviews.length,
        overall_rating: overallRating,
        content_rating: overallContentRating,
        workload_rating: overallWorkloadRating,
        delivery_rating: overallDeliveryRating,
        reviews: reviews.filter((r) => r.content !== undefined),
      };

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e.errors.content.properties.message);
    }
  }
};

export default handler;
