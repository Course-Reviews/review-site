import Amplify, { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../db/mongoose';
import config from '../../../util/aws-exports';
import Review from '../../../models/review';
import { getUser } from '../../../middleware/userMiddleware';
import { FetchUserRatingsResponse } from '../../../dtos/FetchUserRatings';
import { FetchUserReviewsResponse } from '../../../dtos/FetchUserReviews';


connectDB();
Amplify.configure(config);

const handler = async (req: NextApiRequest, res: NextApiResponse<FetchUserReviewsResponse | string>) => {

  const user = await getUser(req);

  if (req.method === 'GET') {
    // User must be authenticated
    if (!user) {
      return res.status(401).send('Not authenticated');
    }

    const query = await Review.aggregate([
      { $match: {user_id: user.username} },
      {
        $lookup: {
          from: 'courses',
          localField: 'owner',
          foreignField: '_id',
          as: 'course',
        },
      },
      {
        // Get the number of reviews + the average review score
        $addFields: {
          course: { $arrayElemAt: [ '$course', 0 ] },
        },
      },
      {
        $project: {
          enjoyment_rating: 1,
          relaxed_rating: 1,
          delivery_rating: 1,
          course_rating: 1,
          content: 1,
          upvote: 1,
          downvote: 1,
          taken_date: 1,
          course: 1,
          createdAt: 1
        },
      },
    ]);


    const data: FetchUserReviewsResponse = (query as any[]).map(r => ({
      review: {
        id: r._id,
        content: r.content,
        course_rating: r.course_rating,
        relaxed_rating: r.relaxed_rating,
        enjoyment_rating: r.enjoyment_rating,
        delivery_rating: r.delivery_rating,
        taken_date: r.taken_date,
        votes: r.upvote - r.downvote,
        createdAt: r.createdAt,
      },
      code: r.course.code,
      university: r.course.university,
      title: r.course.title,
    }));
    console.log(data);

    res.status(200).json(data as FetchUserReviewsResponse);
  }
};

export default handler;
