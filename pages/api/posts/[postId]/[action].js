// needs the review id, easily exploitable
import Review from '../../../../models/review';
import connectDB from '../../../../db/mongoose';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'PATCH') {
    const url = req.url.split('/');

    switch (url[4]) {
      case 'upvote':
        try {
          const review = await Review.findByIdAndUpdate(url[3], {
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
          const review = await Review.findByIdAndUpdate(url[3], {
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
