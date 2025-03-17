export interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  last_login: string;
}

export interface APIUpdateUser {
  user: User;
}
