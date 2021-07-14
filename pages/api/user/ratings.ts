import Amplify, { withSSRContext } from 'aws-amplify';
import { NextApiRequest, NextApiResponse } from 'next';
import connectDB from '../../../db/mongoose';
import config from '../../../aws-exports';
import Rating from '../../../models/Rating';

interface ratingsResponse {
  [postId: string]: boolean;
}

connectDB();
Amplify.configure(config);

const handler = async (req: NextApiRequest, res: NextApiResponse<ratingsResponse>) => {
  const { Auth } = withSSRContext({ req });

  const user = await (async () => {
    try {
      const user = await Auth.currentAuthenticatedUser();
      return user;
    } catch (e) {
      console.log(e.message);
      return;
    }
  })();

  if (req.method === 'GET') {
    // User must be authenticated
    if (!user) {
      return res.status(401).json({ success: false });
    }

    const ratings = await Rating.find({ user_id: user.username });
    const data = (ratings as any[]).reduce((p, c) => {
      p[c.post_id] = c.positive;
      return p;
    }, {} as ratingsResponse);

    res.status(200).json(data);
  }
};

export default handler;
