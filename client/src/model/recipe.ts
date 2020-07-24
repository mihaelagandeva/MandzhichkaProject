import { Tag } from './tag'

export interface Recipe {
    id: number,
    author: string,
    title: string,
    date: string,
    prepTime: number,
    picturePath: string,
    products?: {name: string, quantity: number, metric: string}[],
    steps?: string[],
    rating: number,
    tags: Tag[],
    summary?: string,
    comments?: {text: string, date: string, author: string}[]
}