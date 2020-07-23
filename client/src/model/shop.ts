export interface Shop {
  name: string;
  address: string;
  picturePath: string;
}

export interface ShopReport {
  page: number;
  size: number;
  resultSet: Shop[];
  totalItems: number;
}
