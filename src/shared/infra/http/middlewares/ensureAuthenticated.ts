import {NextFunction, Request, Response} from "express"
import { verify } from "jsonwebtoken";
import { AppError } from "../../../errors/AppError";
import auth from "@config/auth";


interface IPayload {
    sub:string;
}

export async function ensureAuthenticated(
    request: Request, 
    response: Response, 
    next: NextFunction) {
    const authHeader = request.headers.authorization;

    //#####erro
    //O evento unhandledRejection é emitido sempre que um Promise é 
    //rejeitado e nenhum manipulador de erro é anexado à promessa.
    //Root do erro era aspas duplas no token, solução: retirar aspas no insomnia
    //Necessário correção no try catch
    if(!authHeader){
        throw new AppError("Token missing.",401);
    }

    //não usa o prefixo bearer, salva segunda informação na variável token
    const [, token] = authHeader.split(" ")

    
    try {
        const {sub: user_id} = verify(token, 
            auth.secret_token) as IPayload;

        request.user = {
            id:user_id
        }

        next()
        }catch{
        throw new AppError("Invalid token.",401);
        }
    
}