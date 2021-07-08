// needs the review id, easily exploitable
import Review from '../../../../models/review';
import connectDB from '../../../../db/mongoose';
import RateLimit from 'express-rate-limit';
import MongoStore from 'rate-limit-mongo';
import initMiddleware from '../../../../middleware/initMiddleware';
import Amplify, { withSSRContext } from 'aws-amplify';
import config from '../../../../aws-exports'

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
Amplify.configure(config);

const handler = async (req, res) => {

  const { Auth } = withSSRContext({ req });

  const user = await (async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (e) {
      console.log(e.message);
      return;
    }

  })()

  if (req.method === 'PATCH') {
    await limiter(req, res);

    // User must be authenticated
    if(!user){
      return res.status(401).json({ success: false })
    }

    switch (req.query.action) {
      case 'upvote':
        try {
          const review = await Review.findByIdAndUpdate(req.query.postId, {
            $inc: {
              upvote: 1,
            },
          }, {new: true});

          res.status(200).json(review);
        } catch (e) {
          res.status(400).json(e);
        }
        break;
      case 'downvote':
        try {
          const review = await Review.findByIdAndUpdate(req.query.postId, {
            $inc: {
              downvote: 1,
            },
          }, {new: true});

          res.status(200).json(review);
        } catch (e) {
          res.status(400).json(e);
        }
        break;
      default:
        res.status(400).json({ success: false });
    }
  }
};

export default handler;
