const config = {
  aws_user_pools_id: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID,
  aws_user_pools_web_client_id: process.env.NEXT_PUBLIC_COGNITO_WEB_CLIENT_ID,
    // identityPoolId: process.env.COGNITO_IDENTITY_POOL_ID,
    // identityPoolRegion: process.env.COGNITO_REGION,
    aws_project_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    aws_cognito_region: process.env.NEXT_PUBLIC_COGNITO_REGION,
    oauth: {
      redirectSignIn: `${process.env.NEXT_PUBLIC_HOST}`,
      redirectSignOut: `${process.env.NEXT_PUBLIC_HOST}`,
      responseType: 'code',
      domain: `${process.env.NEXT_PUBLIC_COGNITO_DOMAIN}`,
      scope: ['phone', 'email', 'openid', 'profile', 'aws.cognito.signin.user.admin'],
    },
    federationTarget: 'COGNITO_USER_POOLS'
};

export default config;
