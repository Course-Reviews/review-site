import connectDB from '../../../db/mongoose';
import Course from '../../../models/course';
import Review from '../../../models/review';

connectDB();

const handler = async (req, res) => {
  // Find a course with a given code and university
  if (req.method === 'GET') {
    const { uni, code } = req.query;

    try {
      const course = await Course.findOne({
        university: uni,
        pageId: code,
      })
        .populate('reviews', 'course_rating')
        .exec();

      const reviews = course.reviews;

      // populate review info
      course.no_of_reviews = reviews.length;
      course.rating = reviews.map((v) => v.course_rating).reduce((p, c) => p + c, 0) / reviews.length

      res.status(200).json(course);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
export default handler;
