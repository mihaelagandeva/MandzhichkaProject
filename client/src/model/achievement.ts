export interface Achievement {
  name: string;
  description: string;
}

export interface AchievementReport {
  page: number;
  size: number;
  resultSet: Achievement[],
  totalItems: number;
}
