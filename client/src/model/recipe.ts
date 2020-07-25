import { Tag } from './tag'
import { User } from './User';
import { Product } from './Product';

export interface Recipe {
    _id: string,
    author: User,
    name: string,
    date: string,
    prepTime: number,
    picturePath: string,
    products?: {name:string, quantity: number, metrics: string}[],
    steps?: string[],
    rating: number,
    tags: Tag[],
    summary?: string
}

export interface RecipeReport {
    page: number;
    size: number;
    resultSet: Recipe[];
    totalItems: number;
}