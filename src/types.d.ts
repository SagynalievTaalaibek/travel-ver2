export interface UserInterface {
  name: string;
  email: string;
  password: string;
  role: string;
}


export interface UserDataInterface {
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
  region: string;
  date: string,
  duration: string,
  price: string,
  maxPeople: string,
  amountPeople: string,
  guide: string,
}

export interface TourApi {
  [key: string]: TourCreateForm;
}

export interface TourCard {
  id: string;
  name: string;
  price: string;
  img: string;
}

export interface Guide {
  id: string;
  name: string;
  email: string;
}

export interface TourBooks {
  id: string;
  guide: string,
  name: string,
  img: string,
  description: string,
  region: string;
  date: string,
  duration: string,
  price: string,
  maxPeople: string,
  amountPeople: string,
}

export interface BookOrder {
  userId: string;
  phone: string;
  name: string;
  date: string;
  tourId: string;
  guideId: string;
  amountPeople: string;
  statusPay: boolean;
  statusFinish: boolean;
}

export interface BookOrderApi {
  [key: string]: BookOrder;
}

export interface BooksOrders {
  id: string;
  userId: string;
  name: string;
  date: string;
  phone: string;
  tourId: string;
  guideId: string;
  amountPeople: string;
  statusPay: boolean;
  statusFinish: boolean;
}