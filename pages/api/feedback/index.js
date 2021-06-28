import Feedback from '../../../models/feedback';
import connectDB from '../../../db/mongoose';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const fb = new Feedback({
      ...req.body,
    });

    try {
      await fb.save();
      res.status(201).json(fb);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};

export default handler;
