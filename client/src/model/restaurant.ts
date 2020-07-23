export interface Restaurant {
  name: string;
  address: string;
  picturePath: string;
  phone?: string;
}

export interface RestaurantReport {
  page: number;
  size: number;
  resultSet: Restaurant[];
  totalItems: number;
}
