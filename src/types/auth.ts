import { User } from "./user";

export interface APISignIn {
  user: User;
  access_token: string;
}

export interface APISignUp {
  user: User;
  access_token: string;
}
