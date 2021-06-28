const dummy = [
  {
    name: 'softeng251',
    description: 'Algorithms course',
    uni: 'Uoa',
    rating: 3,
    lecturers: 'Bakh',
  },
  {
    name: 'softeng250',
    description: 'Java course',
    uni: 'Uoa',
    rating: 3,
    lecturers: 'Ewan',
  },
];

const handler = async (req, res) => {
  if (req.method === 'GET') {
    const { courseName, uni } = req.query;
    const query = {};

    if (uni) {
      query.uni = uni;
    }

    // const course = await Course.find({query, name: { $regex: courseName} }, 'name uni');

    const c = dummy.filter((course) => course.uni === uni && course.name.includes(courseName));

    res.json(c);
  }
};

export default handler;
