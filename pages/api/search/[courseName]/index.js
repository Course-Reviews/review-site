import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';

connectDB();

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { courseName, uni } = req.query;

    if (uni) {
      try {
        const courses = await Course.find(
          { name: new RegExp(`^${courseName}.*`, 'i'), uni },
          '_id name uni'
        );
        res.status(200).json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    } else {
      try {
        const courses = await Course.find(
          { name: new RegExp(`^${courseName}.*`, 'i') },
          '_id name uni'
        );
        res.json(courses);
      } catch (e) {
        res.status(400).json(e);
      }
    }
  }
};

export default handler;
