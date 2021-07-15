import { withSSRContext } from 'aws-amplify';
import { NextApiRequest } from 'next';
import { CognitoUser } from '../types/cognito';

export const getUser = async (req: NextApiRequest) : Promise<CognitoUser | undefined> => {
  const { Auth } = withSSRContext({ req });

  try {
    const user = await Auth.currentAuthenticatedUser();
    return user;
  } catch (e) {
    console.log('get user error', e);
    return;
  }
};