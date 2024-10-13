import { hash, compare } from 'bcryptjs';

interface CryptoPayload {
  password: string;
  hashedPassword?: string;
}

interface CryptoData {
  hashedPassword: string;
}

/**
 * Hashes a plain text password using bcrypt.
 *
 * @param {CryptoPayload} payload - The payload containing the plain text password.
 * @returns {CryptoData} An object containing the hashed password.
 */
export const hashPassword = async (payload: CryptoPayload): Promise<CryptoData> => {
  const hashedPassword = await hash(payload.password, 10);

  return {
    hashedPassword,
  };
};

/**
 * Verifies a plain text password against a hashed password using bcrypt.
 *
 * @param {CryptoPayload} payload - The payload containing the plain text password and the hashed password.
 * @returns {boolean} True if the password matches the hashed password, false otherwise.
 */
export const verifyPassword = async (payload: CryptoPayload): Promise<boolean> => {
  return await compare(payload.password, payload.hashedPassword);
};
