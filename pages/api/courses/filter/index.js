import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { university, stage } = req.query;
    const match = {};

    if (university) {
      match.university = university;
    }

    if (stage) {
      match.stage = stage;
    }

    try {
      const courses = await Course.find({
        code: new RegExp(`.*\\s${match.stage}.*`, 'i'),
        university,
      });

      res.status(200).json(courses);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};

export default handler;
