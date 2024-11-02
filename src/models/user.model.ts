import { Request } from "express";

export interface LoginRequest extends Request{
    email : string,
    password : string
}

export interface RegisterRequest extends Request{
    
}