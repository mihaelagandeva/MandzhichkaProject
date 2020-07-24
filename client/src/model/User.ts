import {Achievment} from './achievment'

export interface User{
    username: string,
    password: string,
    achievments: Achievment[]
}