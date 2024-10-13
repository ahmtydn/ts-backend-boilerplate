import { v4 as uuidV4 } from 'uuid';

/**
 * Generate a new UUID
 */
export default (): string => {
  return uuidV4();
};
