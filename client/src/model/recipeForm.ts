import { Tag } from './tag'

export interface RecipeFormValue {
    title?: string,
    products?: string[],
    prepTime?: string,
    tags?: Tag[],
    picturePath?: string,
    steps?: string[],
    summary?: string
}