import { Request } from "express";


interface UserInfo{
    username : string
    id : string
}
export interface LoginRequest extends Request{
    email : string,
    password : string
}

export interface RegisterRequest extends Request{
    
}

export interface RequestWithUser extends Request{
    user? : UserInfo
}