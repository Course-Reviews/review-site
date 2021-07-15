export interface CognitoUser {
  username: string;
  pool: {
    userPoolId: string;
    clientId: string;
    client: {
      endpoint: string;
      fetchOptions: object;
    }
    advancedSecurityDataCollectionFlag: boolean,
    storage: {
      cookies: {
        changeListeners: any[],
        HAS_DOCUMENT_COOKIE: boolean;
        cookies: {
          [key: string]: string;
        }
      },
      store: {
        'amplify-signin-with-hostedUI': boolean;
        'ally-supports-cache': string;
      }
    }
  },
  Session: null;
  client: {
    endpoint: string;
    fetchOptions: object;
  },
  signInUserSession: {
    idToken: {
      jwtToken: string;
      payload: {
        'sub': string;
        'email_verified': boolean;
        'iss': string;
        'cognito:username': string;
        'origin_jti': string;
        'aud': string;
        'event_id': string;
        'token_use': string;
        'auth_time': number;
        'exp': number;
        'iat': number;
        'jti': string;
        'email': string;
      }
    },
    refreshToken: {
      token: string;
    },
    accessToken: {
      jwtToken: string;
      payload: {
        'sub': string;
        'email_verified': boolean;
        'iss': string;
        'cognito:username': string;
        'origin_jti': string;
        'aud': string;
        'event_id': string;
        'token_use': string;
        'auth_time': number;
        'exp': number;
        'iat': number;
        'jti': string;
        'email': string;
      },
      clockDrift: number
    }
  },
  'attributes': {
    'sub': string,
    'email_verified': boolean,
    'email': string
  },
  'preferredMFA': string;
}