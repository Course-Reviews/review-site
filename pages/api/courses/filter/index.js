import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { university, stage } = req.query;

    if (stage != 'All') {
      try {
        const courses = await Course.find({
          code: new RegExp(`.*\\s${match.stage}.*`, 'i'),
          university,
        })
          .sort({ 'code': 1 })
          .limit(10);

        res.status(200).json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    } else {
      try {
        const courses = await Course.find({
          university,
        })
          .sort({ 'code': 1 })
          .limit(10);

        res.status(200).json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    }
  }
};

export default handler;
