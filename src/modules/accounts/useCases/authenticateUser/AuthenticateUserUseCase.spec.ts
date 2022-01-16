import { UsersTokensRepositoryInMemory } from "../../../../modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "../../repositories/inMemory/UsersRepositoryInMemory"
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

let authenticateUserUseCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory
let createUserUseCase: CreateUserUseCase;
let dateProvider: DayjsDateProvider

describe("Authenticate User", ()=>{
    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserUseCase = new AuthenticateUserUseCase(
            usersRepositoryInMemory,
            userTokensRepositoryInMemory,
            dateProvider);
        dateProvider = new DayjsDateProvider()
        createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory);
    })
    it("Should be able to authenticate an user", async ()=>{
        const user: ICreateUserDTO = {
            driver_licence: "00012213",
            email: "emailteste",
            password: "11342",
            name: "nomeTeste"
        };
        await createUserUseCase.execute(user);
        const result = await authenticateUserUseCase.execute({
            email: user.email,
            password: user.password
        });
        expect(result).toHaveProperty("token")
    });
    it("Should not be able to authenticate an nonexistent user", async ()=>{
        await expect(
             authenticateUserUseCase.execute({
                email: "emailteste",
                password: "11342"
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })

    it("Should not be able to authenticate with incorrect password",async ()=>{
        
        const user: ICreateUserDTO = {
            driver_licence: "56767",
            email: "emailteste",
            password: "11342",
            name: "nome teste"
        }

        await createUserUseCase.execute(user);

        await expect(
            authenticateUserUseCase.execute({
                email: user.email,
                password: "incorrectPassword",
            })
        ).rejects.toEqual(new AppError("Email or password incorrect!"))
    })
});