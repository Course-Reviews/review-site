import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../../db/mongoose';
import Course from '../../../../models/course';
import { CourseSummary, FACULTYS, Pagination } from '../../../../types/config';

connectDB();

const PAGE_SIZE = 10;

export interface fetchCoursesResponse {
  courses: CourseSummary[];
  pagination: Pagination;
}


const handler = async (req: NextApiRequest, res: NextApiResponse<fetchCoursesResponse>) => {
  if (req.method === 'GET') {
    const { uni, stage, term, faculty, query } = req.query;

    const page = parseInt(`${req.query.page || 0}`);

    // construct match criteria
    const matchCriteria: {[key: string]: any} = {};
    if (stage) {
      matchCriteria.code = new RegExp(`.*\\s${stage}.*`, 'i');
    }
    if (uni) {
      matchCriteria.university = uni;
    }
    if (term){
      matchCriteria.term = { $all: [parseInt(`${term}`)] }
    }
    if (faculty){
      matchCriteria.faculty = FACULTYS[parseInt(`${faculty}`)]
    }
    if (query) {
      matchCriteria['$or'] = [{code: new RegExp(`${query}`, 'i')}, {title: new RegExp(`${query}`, 'i')}]
    }

    try {
      const query = await Course.aggregate([
        {
          $facet: {
            totalData: [
              { $match: matchCriteria },
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
                  rating: { $ifNull: [{$avg: '$reviews.course_rating'}, 0]}
                },
              },
              {
                $project: {
                  pageId: 1,
                  code: 1,
                  title: 1,
                  university: 1,
                  reviewCount: 1,
                  rating: 1,
                },
              },
              { $sort: { code: 1 } },
              { $skip: PAGE_SIZE * page },
              { $limit: PAGE_SIZE },
            ],
            totalCount: [{ $match: matchCriteria }, { $count: 'count' }],
          },
        },
      ]);

      // Map to response object
      const data: fetchCoursesResponse = {
        courses: query[0].totalData.map((c: any) => ({
          rating: c.rating,
          numRatings: c.reviewCount,
          code: c.code,
          university: c.university,
          pageId: c.pageId,
          title: c.title
        })),
        pagination: {
          totalCount: query[0].totalCount[0]?.count || 0,
          pageSize: PAGE_SIZE,
          page,
        }
      }

      res.status(200).json(data);
    } catch (e) {
      res.status(400).json(e);
    }
  }
};

export default handler;
