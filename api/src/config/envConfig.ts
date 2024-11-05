export default () => ({
  APP_NAME: process.env.APP_NAME || 'My Nestjs',
  APP_DOMAIN: process.env.APP_DOMAIN || 'http://example.demo.com',
  APP_LOCAL: process.env.APP_URL || 'http://localhost:3000',
  APP_PORT: Number(process.env.APP_PORT) || 3000,
  NODE_ENV: process.env.NODE_ENV,
  APP_KEY: process.env.APP_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
  WEB_URL: process.env.WEB_URL,
  JWT: {
    SECRET: process.env.JWT_SECRET || 'access_token_mhp',
    EXPIRE: process.env.JWT_EXPIRE || '1d',
    REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || 'refresh_token_mhp',
    REFRESH_EXPIRE: process.env.JWT_REFRESH_EXPIRE || '7d',
    REFRESH_SECRET_FORGOT:
      process.env.JWT_REFRESH_SECRET_FORGOT || 'refresh_token_forgot',
    REFRESH_EXPIRE_FORGOT: process.env.JWT_REFRESH_EXPIRE_FORGOT || '2m',
  },
  COOKIE: {
    NAME: process.env.COOKIE_NAME || 'cookie_name_mhp',
    SECRET: process.env.COOKIE_SECRET || 'cookie_secret_mhp',
  },
  THROTTLE: {
    TTL: Number(process.env.THROTTLE_TTL || 60),
    LIMIT: Number(process.env.THROTTLE_LIMIT || 60),
  },
  SALT_ROUND: 10,
  ROOT_PATH:
    process.cwd() + (process.env.NODE_ENV === 'development' ? '/src' : '/dist'),
  PUBLIC_PATH:
    process.cwd() +
    (process.env.NODE_ENV === 'development' ? '/src' : '/dist') +
    '/resources/public',
  DATABASE: {
    CONNECT: process.env.DATABASE_CONNECT as any,
    HOST: process.env.DATABASE_HOST,
    PORT: Number(process.env.DATABASE_PORT),
    USER: process.env.DATABASE_USER,
    PASSWORD: process.env.DATABASE_PASSWORD,
    NAME: process.env.DATABASE_NAME,
  },
  REDIS: {
    HOST: process.env.REDIS_HOST,
    PORT: Number(process.env.REDIS_PORT || 6379),
    USER: process.env.REDIS_USER,
    PASS: process.env.REDIS_PASS,
  },
  EMAIL: {
    HOST: process.env.MAIL_HOST,
    PORT: Number(process.env.MAIL_PORT),
    USERNAME: process.env.MAIL_USER,
    PASSWORD: process.env.MAIL_PASSWORD,
    FROM: process.env.MAIL_FROM,
  },
  TASK_SCHEDULE_FLAG: process.env.TASK_SCHEDULE_FLAG,
  FORGOT_PASSWORD_TTL: Number(process.env.FORGOT_PASSWORD_TTL || 15),
  WHITELIST_DOMAINS: (process.env.WHITELIST_DOMAINS || 'localhost').split(','),
  CONTACT_MAIL: process.env.CONTACT_MAIL || 'support@diginex-climate.com',
  FILE_LIMIT: {
    ASSESSMENT_DOCUMENT:
      Number(process.env.FILE_LIMIT_ASSESSMENT_DOCUMENT) || 5,
  },
  AUTH_TOKEN_RMA: process.env.AUTH_TOKEN_RMA,
});
