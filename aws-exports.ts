const config = {
  aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
  Auth: {
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
    userPoolWebClientId: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID,
      // identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
      // identityPoolRegion: process.env.COGNITO_REGION,
      region: process.env.NEXT_PUBLIC_COGNITO_REGION,
      oauth: {
        redirectSignIn: `${process.env.NEXT_PUBLIC_HOST}`,
        redirectSignOut: `${process.env.NEXT_PUBLIC_HOST}`,
        responseType: 'code',
        domain: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`,
        scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
      }
  },
  ssr: true
};

export default config;
