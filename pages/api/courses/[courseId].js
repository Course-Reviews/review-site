import connectDB from '../../../db/mongoose';
import Course from '../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const courses = await Course.find();

      res.status(200).json(courses);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
export default handler;
