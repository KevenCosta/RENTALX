import { IUsersTokensRepository } from "../../../../modules/accounts/repositories/IUsersTokensRepository";
import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import auth from "../../../../config/auth";
import { IDateProvider } from "@shared/container/providers/DateProvider/IDateProvider";

interface IRequest {
    email:string;
    password: string;
}

interface IResponse {
    user: {
        name: string;
        email: string;
    },
    token: string,
    refresh_token: string
}
@injectable()
class AuthenticateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dayjsProvider: IDateProvider
    ){}

    async execute({email, password}: IRequest): Promise<IResponse>{
        const user = await this.usersRepository.findByEmail(email)
        const {secret_token,
            expires_in_token,
            secret_refresh_token,
            expires_in_refresh_token,
            expires_refresh_token_days} = auth

        if(!user){
            throw new AppError("Email or password incorrect!");
        }

        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new AppError("Email or password incorrect!");
        }

        //payload dados do usuario
        //privatekey é a senha para criptografar (rentalxignite)
        //MD5 Hash - Teste com Bearer token
        const token = sign({}, secret_token, {
            subject: user.id,
            expiresIn: expires_in_token
        });

        //privatekey base(rentalxigniteRefreshToken)
        const refresh_token = sign({email}, secret_refresh_token,
            {subject: user.id,
            expiresIn:expires_in_refresh_token})

        const refresh_token_expires_date = this.dayjsProvider.addDays(
            expires_refresh_token_days)

        await this.usersTokensRepository.create({
            expires_date:refresh_token_expires_date,
            refresh_token,
            user_id:user.id
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token
        }
        return tokenReturn
    }
}

export {AuthenticateUserUseCase}