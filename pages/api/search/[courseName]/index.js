import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { courseName, uni } = req.query;

    if (uni) {
      const courses = await Course.find({ name: { $regex: courseName }, uni }, '_id name uni');
      res.json(courses);
    } else {
      const courses = await Course.find({ name: { $regex: courseName } }, '_id name uni');
      res.json(courses);
    }

  }
};

export default handler;
