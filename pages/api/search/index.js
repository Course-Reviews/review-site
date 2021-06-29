import connectDB from '../../../db/mongoose';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    res.status(400).json({
      error: 'Missing a course name',
    });
  }
};

export default handler;
