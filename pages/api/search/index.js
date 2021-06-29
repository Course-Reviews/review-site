import connectDB from '../../../db/mongoose';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    res.json([]);
  }
};

export default handler;
