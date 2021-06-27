// a post for a corresponding course
import Review from '../../../../models/review';

const handler = async (req, res) => {
  if(req.method === 'POST') {
    const review = new Review({
      ...req.body,
      owner: req.params.id,
    });

    const reviewCreated = await review.save();

    res.status(201).send(reviewCreated)
  }

};

export default handler;
