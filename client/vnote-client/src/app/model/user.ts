import {Board} from "./board";

export class User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  notifications: string[];
  boards: Board[];
}
