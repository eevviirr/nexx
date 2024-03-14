export interface userType {
  email: string;

  name: string;
  surname: string;
  lastName?: string;
  birthday?: string;
  address?: string;

  favorites: productType[];
  basket: productType[];
}

export interface productType {
  _id: string;
  model: string;
  price: number;
  description: string;
  compound: string;
  brand: string;
  quantity: number;

  photos: string[];
  sizes: number[];
  colors: string[];
}
