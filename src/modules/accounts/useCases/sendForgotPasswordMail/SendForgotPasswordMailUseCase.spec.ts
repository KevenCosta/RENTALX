import { AppError } from "../../../../shared/errors/AppError";
import { UsersRepositoryInMemory } from "../../../../modules/accounts/repositories/inMemory/UsersRepositoryInMemory"
import { UsersTokensRepositoryInMemory } from "../../../../modules/accounts/repositories/inMemory/UsersTokensRepositoryInMemory";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { MailProviderInMemory } from "../../../../shared/container/providers/MailProvider/in-memory/MailProviderInMemory";
import { SendForgotPasswordMailUseCase } from "./SendForgotPasswordMailUseCase"

let sendForgotPasswordMailUseCase:SendForgotPasswordMailUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let dateProvider: DayjsDateProvider;
let usersTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let mailProvider: MailProviderInMemory;

describe("Send forgot mail", ()=>{

    beforeEach(()=>{
        usersRepositoryInMemory = new UsersRepositoryInMemory()
        dateProvider = new DayjsDateProvider()
        usersTokensRepositoryInMemory = new UsersTokensRepositoryInMemory()
        mailProvider = new MailProviderInMemory()
        sendForgotPasswordMailUseCase = new SendForgotPasswordMailUseCase(
            usersRepositoryInMemory,
            usersTokensRepositoryInMemory,
            dateProvider,
            mailProvider
        );
    });

    it("Should be able to send a forgot password mail to user", async ()=>{
        //erro de referência do spyOn corrigido chamando 'jest.' antes
        const sendMail = jest.spyOn(mailProvider, "sendMail")
        await usersRepositoryInMemory.create({
            driver_licence: "173892",
            email: "nipjozle@aduep.ch",
            name: "Louis Ball",
            password: "1234"
        });
        await sendForgotPasswordMailUseCase.execute("nipjozle@aduep.ch")
        expect(sendMail).toHaveBeenCalled()
    });
    
    it("Should not be able to send an email if user does not exists", async ()=>{
        await expect(
            sendForgotPasswordMailUseCase.execute("daofbel@fa.cf")
        ).rejects.toEqual(new AppError("Users does not exists!"));
    })

    it("Should be able to create an users token", async ()=>{
        const generateTokenMail = jest.spyOn(usersTokensRepositoryInMemory, "create")
        usersRepositoryInMemory.create({
            driver_licence: "173892",
            email: "zarha@wofuva.by",
            name: "Derrick Patrick",
            password: "1234"
        });

        await sendForgotPasswordMailUseCase.execute("zarha@wofuva.by")
        expect(generateTokenMail).toBeCalled()
    })


})