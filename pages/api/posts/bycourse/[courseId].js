// a post request for a post on a course (needs the course id)
import Amplify from 'aws-amplify';
import RateLimit from 'express-rate-limit';
import mongoose from 'mongoose';
import MongoStore from 'rate-limit-mongo';
import config from '../../../../util/aws-exports';
import connectDB from '../../../../db/mongoose';
import initMiddleware from '../../../../middleware/initMiddleware';
import { getUser } from '../../../../middleware/userMiddleware';
import Review from '../../../../models/review';

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
Amplify.configure(config);

const handler = async (req, res) => {
  const user = await getUser(req);

  if (req.method === 'POST') {
    await limiter(req, res);


    // Destructure so we only put the properties we need into the database
    const {
      taken_date,
      enjoyment_rating,
      relaxed_rating,
      delivery_rating,
      user_id,
      user_name,
      content,
    } = req.body;

    const key = {
      user_id,
      owner: mongoose.Types.ObjectId(req.query.courseId),
    }

    // quick and dirty validation - redo this better later

    if(enjoyment_rating > 5 || enjoyment_rating < 1){
      res.status(400).json('invalid enjoyment_rating')
      return;
    } else if (delivery_rating > 5 || delivery_rating < 1 ) {
      res.status(400).json('invalid delivery_rating')
      return;
    }else if (relaxed_rating > 5 || relaxed_rating < 1 ) {
      res.status(400).json('invalid relaxed_rating')
      return;
    }

    const ip =  req.headers['x-forwarded-for'] || req.connection.remoteAddress;

    const reviewData = {
      taken_date,
      enjoyment_rating,
      relaxed_rating,
      delivery_rating,
      user_name,
      content,
      course_rating: (enjoyment_rating + relaxed_rating + delivery_rating) / 3,
      poster_ip: ip,
    };

    try {
      if (user) {
        // Posting as a user - update an existing review if it exists (so a user can only have a max of 1 review per course)
        const review = await Review.findOneAndUpdate(key, reviewData, {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        });

        res.status(201).json(review);
      } else {
        // Posting anon - just make a new review
        const review = new Review({ ...reviewData, ...key });

        await review.save();
        res.status(201).json(review);
      }
    } catch (e) {
      console.log(e);
      res.status(400).json(e.errors?.content.properties.message);
    }
  }

  if (req.method === 'GET') {
    // Fetch all reviews for a given course

    try {
      const reviews = await Review.find({
        owner: req.query.courseId,
      }).lean();

      const overallRating = reviews.reduce((p, c) => p + c.course_rating, 0) / reviews.length;
      const overallRelaxedRating =
        reviews.reduce((p, c) => p + (c.relaxed_rating || 5 - c.workload_rating + 2), 0) /
        reviews.length;
      const overallEnjoymentRating =
        reviews.reduce((p, c) => p + (c.enjoyment_rating || Math.max(c.content_rating - 1, 1)), 0) /
        reviews.length;
      const overallDeliveryRating =
        reviews.reduce((p, c) => p + c.delivery_rating, 0) / reviews.length;

      const data = {
        num_ratings: reviews.length,
        overall_rating: overallRating,
        enjoyment_rating: overallEnjoymentRating,
        relaxed_rating: overallRelaxedRating,
        delivery_rating: overallDeliveryRating,
        reviews: reviews
          .filter((r) => r?.content !== undefined && r?.content !== '')
          .map(({ user_id, ...rest }) => ({
            ...rest,
          })),
        // This is the id of the users review if they have already left a review for this course
        user_review_id: user?.username
          ? reviews.find((r) => r.user_id === user?.username)?._id
          : undefined,
      };

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e.errors?.content.properties.message);
    }
  }
};

export default handler;
