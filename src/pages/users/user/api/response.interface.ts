import { JSXElement } from "solid-js";
import { IPaginated } from "../../../../common/interface/pagination";

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

interface IUserRecord {
  id: number;
  user: JSXElement;
  role: JSXElement;
  status: JSXElement;
  last_login: string;
}

export interface UsersResponse extends IPaginated {
  users: UserResponse[] | IUserRecord[];
}
