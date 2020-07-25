import { User } from './User'

export interface Comment{
    author: User,
    recipeId: string,
    text: string,
    date: string
}