import { Achievment } from './achievment'
import { Recipe } from './recipe'

export interface User{
    username: string,
    password: string,
    achievments: Achievment[]
    favourites: Recipe[]
}