import Course from '../../../../models/course';

const handler = async (req, res) => {
  const { courseName } = req.query;

  const course = await Course.find({ name: { $regex: courseName }, uni: req.query.uni });

  res.send({
    name: course.name,
    uni: course.uni
  });

};

export default handler;
