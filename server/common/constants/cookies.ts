const isProduction = process.env.NODE_ENV === 'production';

export const THIRTY_DAY_COOKIE = {
  maxAge: 60 * 60 * 1000 * 24 * 30,
  secure: isProduction,
  httpOnly: true,
  sameSite: true,
};

export const AUTH_COOKIE = 'MentorLabsToken';
