// a post request for a post on a course (needs the course id)
import mongoose from 'mongoose';
import Review from '../../../../models/review';
import connectDB from '../../../../db/mongoose';
import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import initMiddleware from '../../../../middleware/initMiddleware';

const LIMIT_TIMER =  60 * 60 * 1000

const limiter = initMiddleware(
  new RateLimit({
    store: new MongoStore({
      uri: process.env.MONGO_URI,
      // should match windowMs
      expireTimeMs: LIMIT_TIMER,
      errorHandler: console.error.bind(null, 'rate-limit-mongo'),
      // see Configuration section for more options and details
    }),
    windowMs: LIMIT_TIMER,
    max: 20,
  })
);

connectDB();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    await limiter(req, res);

    // quick and dirty validation - redo this better later
    const {relaxed_rating, delivery_rating, course_rating, enjoyment_rating} = req.body;

    if(enjoyment_rating > 5 || enjoyment_rating < 1){
      res.status(400).json('invalid enjoyment_rating')
      return;
    } else if (delivery_rating > 5 || delivery_rating < 1 ) {
      res.status(400).json('invalid delivery_rating')
      return;
    }else if (relaxed_rating > 5 || relaxed_rating < 1 ) {
      res.status(400).json('invalid relaxed_rating')
      return;
    }else if (course_rating > 5 || course_rating < 1 ) {
      res.status(400).json('invalid course_rating')
      return;
    }

    const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const review = new Review({
      ...req.body,
      poster_ip: ip,
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

      console.log(data);

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e.errors.content.properties.message);
    }
  }
};

export default handler;