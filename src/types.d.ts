export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role: string;
}


export interface UserData {
  id: string;
  name: string;
  email: string;
  password: string;
  role: string;
}


export interface UserGet {
  [key: string]: UserInterface;
}

export interface TourCreateForm {
  name: string,
  img: string,
  description: string,
  region: number;
  date: string,
  duration: number,
  price: number,
  maxPeople: number,
  amountPeople: number,
  guide: string,
}

export interface TourApi {
  [key: string]: TourCreateForm;
}

export interface TourCard {
  id: string;
  name: string;
  price: number;
  img: string;
}

export interface Guide {
  id: string;
  name: string;
  email: string;
}