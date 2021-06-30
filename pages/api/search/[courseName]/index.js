import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { courseName, university } = req.query;

    if (university) {
      try {
        const courses = await Course.find(
          {
            $or: [
              { code: new RegExp(`^${courseName}.*`, 'i') },
              { code: new RegExp(`.*\\s${courseName}.*`, 'i') },
            ],
            university,
          },
          '_id code university'
        )
        .sort({'code': 1})
        .limit(5);

        res.status(200).json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    } else {
      try {
        const courses = await Course.find(
          {
            $or: [
              { code: new RegExp(`^${courseName}.*`, 'i') },
              { code: new RegExp(`.*\\s${courseName}.*`, 'i') },
            ],
          },
          '_id code university'
        )
        .sort({'code': 1})
        .limit(5);

        res.json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    }
  }
};

export default handler;
