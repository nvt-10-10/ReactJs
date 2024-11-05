import * as dotenv from 'dotenv';
dotenv.config();

export const envPath = {
  ROOT_PATH:
    process.cwd() + (process.env.NODE_ENV === 'development' ? '/src' : '/dist'),
  PUBLIC_PATH:
    process.cwd() +
    (process.env.NODE_ENV === 'development' ? '/src' : '/dist') +
    '/resources/public',
  VIEW_PATH:
    process.cwd() +
    (process.env.NODE_ENV === 'development' ? '/src' : '/dist') +
    '/resources/views',
};
