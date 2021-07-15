import Amplify, { Auth } from 'aws-amplify';
import * as React from 'react';
import { createContext, useEffect, useState } from 'react';
import awsExports from '../../util/aws-exports';
import fetchRatings from '../../functions/fetchRatings';
import { CognitoUser } from '../../types/cognito';

// This is a thin wrapper around the Auth package from aws-amplify mostly for the purpose of ensuring that auth state changes are reflected in the app
// By default calling a method such as Auth.signOut() wont cause react to re-render.
// This solves it by keeping the user in state which is hydrated on page load.

Amplify.configure({ ...awsExports, ssr: true });

interface SigninData {
  username: string;
  password: string;
}

interface SignupData {
  username: string;
  password: string;
  email: string;
}

interface AuthState {
  user?: CognitoUser;
  hasResolved: boolean;
  ratings: {[postId: string]: boolean}
}

interface contextState {
  signIn: (credientials: SigninData) => Promise<void>;
  signUp: (userData: SignupData) => Promise<void>;
  signOut: () => Promise<void>;
  user?: CognitoUser;
  hasResolved: boolean;
  ratings: {[postId: string]: boolean};
}

export const AuthContext = createContext<contextState>({
  signIn: async () => {},
  signUp: async () => {},
  signOut: async () => {},
  hasResolved: false,
  ratings: {}
});

export const CognitoAuthProvider: React.FC = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    hasResolved: false,
    ratings: {}
  });

  // resolve user on load
  useEffect(() => {
    const doAsync = async () => {
      try {
        const res = await Auth.currentAuthenticatedUser();
        const ratings = await fetchRatings();
        setState({
          user: res,
          hasResolved: true,
          ratings
        });
      } catch (e) {
        setState({
          hasResolved: true,
          ratings: {}
        });
      }

    };
    doAsync();
  }, []);

  const signin = async ({username, password}: SigninData) => {
    const res = await Auth.signIn(username, password);
    setState(s => ({
      ...s,
      user: res
    }))
  }

  const signup = async ({username, password, email}: SignupData) => {
    await Auth.signUp({
      username,
      password,
      attributes: {
        email,
      },
    });
    await signin({username, password})
  }

  const signout = async () => {
    await Auth.signOut();
    setState(s => ({
      ...s,
      user: undefined
    }))
  }

  const context: contextState = {
    ...state,
    signIn: signin,
    signUp: signup,
    signOut: signout,
  };

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>;
};
