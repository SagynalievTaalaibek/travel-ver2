export interface UserInterface {
  email: string;
  password: string;
  role: string;
}


export interface UserData {
  id: string;
  email: string;
  password: string;
  role: string;
}


export interface UserGet {
  [key: string]: UserInterface;
}