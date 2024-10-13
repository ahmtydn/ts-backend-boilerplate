import { DB_DATABASE } from '../config';

export const dbConnection = {
  url: DB_DATABASE,
  options: {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
};
