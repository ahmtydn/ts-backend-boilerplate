import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config';

interface TokenPayload {
  id: string;
  email: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export const generateTokens = (payload: TokenPayload, accessTokenExpiry: string, refreshTokenExpiry: string): Tokens => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: accessTokenExpiry });
  const refreshToken = jwt.sign(payload, SECRET_KEY, { expiresIn: refreshTokenExpiry });

  return { accessToken: token, refreshToken };
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, SECRET_KEY) as TokenPayload;
};

export const verifyMatchToken = (token: string): boolean => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
};
