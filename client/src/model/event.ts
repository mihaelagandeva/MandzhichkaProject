export interface Event {
  id: string;
  name: string;
  address: string;
  date: string;
  picturePath: string;
  duration: string;
  joined: boolean;
  canJoin: boolean;
}

export interface EventReport {
  page: number;
  size: number;
  resultSet: Event[];
  totalItems: number;
}