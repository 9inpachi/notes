import { createContext } from 'react';

interface IUser {
  username: string,
  email: string,
  firstName: string,
  lastName: string
}

export const UserContext = createContext<IUser | undefined>(undefined);
