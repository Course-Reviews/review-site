import { withSSRContext } from 'aws-amplify';
import { NextApiRequest } from 'next';

export const getUser = async (req: NextApiRequest) => {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (e) {
    console.log('get user error', e);
    return;
  }
};