import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../db/mongoose';
import Course from '../../../models/course';
import { CourseDetails } from '../../../types/config';

connectDB();

const handler = async (req: NextApiRequest, res: NextApiResponse<CourseDetails>) => {
  // Find the course with a given code and university
  if (req.method === 'GET') {
    const { uni, code } = req.query;

    try {

      const query = await Course.aggregate([
        {
          $facet: {
            totalData: [
              { $match: {
                university: uni,
                pageId: code,
              } },
              {
                $lookup: {
                  from: 'reviews',
                  localField: '_id',
                  foreignField: 'owner',
                  as: 'reviews',
                },
              },

              {
                // Get the number of reviews + the average review score
                $addFields: {
                  reviewCount: { $size: '$reviews' },
                  rating: { $ifNull: [{$avg: '$reviews.course_rating'}, 0]},
                  deliveryRating: { $ifNull: [{$avg: '$reviews.delivery_rating'}, 0]},
                  enjoymentRating: { $ifNull: [{$avg: '$reviews.content_rating'}, 0]},
                  relaxedRating: { $add: [2, {$subtract: [5, { $ifNull: [{$avg: '$reviews.workload_rating'}, 0]}]}]},
                },
              },
              {
                $project: {
                  code: 1,
                  title: 1,
                  university: 1,
                  faculty: 1,
                  rating: 1,
                  reviewCount: 1,
                  term: 1,
                  description: 1,
                  url: 1,
                  requirements: 1,
                  assessments: 1,
                  enjoymentRating: 1,
                  relaxedRating: 1,
                  deliveryRating: 1,
                },
              },
              { $limit: 1 },
            ]
          },
        },
      ]);

      const course = query[0].totalData[0]

      // map to response
      const data: CourseDetails = {
        id: course._id,
        code: course.code,
        title: course.title,
        university: course.university,
        faculty: course.faculty,
        rating: course.rating,
        numRatings: course.reviewCount,
        term: course.term,
        overview: course.description,
        url: course.url,
        requirements: course.requirements,
        assessments: course.assessments,
        deliveryRating: course.deliveryRating,
        enjoymentRating: Math.max(course.enjoymentRating - 1, 1),
        relaxedRating: course.relaxedRating,
      }

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};
export default handler;
