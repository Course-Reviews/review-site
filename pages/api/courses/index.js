import connectDB from '../../../db/mongoose';
import Course from '../../../models/course';

connectDB();

const handler = async (req, res) => {
  // Find a course with a given code and university
  if (req.method === 'GET') {

    const { uni, code } = req.query;

    try {
      const course = await Course.findOne({
        university: uni,
        pageId: code
      });

      res.status(200).json(course);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
export default handler;
