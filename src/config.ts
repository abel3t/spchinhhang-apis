import dotEnv from 'dotenv';

dotEnv.config({ path: '.env' });

const config = {
  PORT: process.env.PORT || 8080,
  UP_STAGE: process.env.UP_STAGE,
  DB_URI: process.env.DB_URI,
  AWS_MY_ACCESS_KEY_ID: process.env.AWS_MY_ACCESS_KEY_ID,
  AWS_MY_SECRET_KEY: process.env.AWS_MY_SECRET_KEY,
  AWS_COGNITO_REGION: process.env.AWS_COGNITO_REGION,
  AWS_COGNITO_USER_POOL_ID: process.env.AWS_COGNITO_USER_POOL_ID,
  AWS_COGNITO_APP_CLIENT_ID: process.env.AWS_COGNITO_APP_CLIENT_ID
};

export default config;
