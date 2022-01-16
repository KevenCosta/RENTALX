import { AppError } from "../../../../shared/errors/AppError";
import { RentalsRepositoryInMemory } from "../../../../modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { CreateRentalUseCase } from "./CreateRentalUseCase"
import dayjs from "dayjs"
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { CarsRepositoryInMemory } from "../../../cars/repositories/inMemory/CarsRepositoryInMemory";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepositoryInMemory: RentalsRepositoryInMemory;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let dayjsDateProvider: DayjsDateProvider;

describe("Create Rental", ()=>{
    const dayAdd24hours = dayjs().add(1,"day").toDate();
    beforeEach(()=>{
        rentalsRepositoryInMemory = new RentalsRepositoryInMemory();
        dayjsDateProvider = new DayjsDateProvider();
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createRentalUseCase = new CreateRentalUseCase(
            rentalsRepositoryInMemory,
            dayjsDateProvider,
            carsRepositoryInMemory);
    })

    it("Should be able to create a new rental", async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Test",
            description: "Car test",
            daily_rate: 100,
            license_plate: "test",
            fine_amount: 40,
            category_id: "1234",
            brand: "brand test"
        })

        const rental = await createRentalUseCase.execute({
            user_id: "12345",
            car_id: car.id,
            expected_return_date: dayAdd24hours
        });
        expect(rental).toHaveProperty("id")
        expect(rental).toHaveProperty("start_date")
    });

    it("Should not be able to create a new rental if there"+ 
    " is another open to the same user", async ()=>{
        await rentalsRepositoryInMemory.create({
            car_id: "12341233444",
            expected_return_date: dayAdd24hours,
            user_id: "12345"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12341233",
                expected_return_date: dayAdd24hours
            })
        ).rejects.toEqual(new AppError(
            "There is a rentals in progress for user!"))   
    });

    it("Should not be able to create a new rental if there"+ 
    " is another open to the same car", async ()=>{
        await rentalsRepositoryInMemory.create({
            car_id: "11111111",
            expected_return_date: dayAdd24hours,
            user_id: "12345999"
        })

        await expect(
            createRentalUseCase.execute({
                user_id: "129999",
                car_id: "11111111",
                expected_return_date: dayAdd24hours
            })
        ).rejects.toEqual(
            {
                "message": "Car is unavailable",
                "statusCode": 400
            }
        )
    })

    it("Should not be able to create a new" 
    +" rental with invalid return time", async ()=>{
        
       await expect(
            createRentalUseCase.execute({
                user_id: "12345",
                car_id: "12341233",
                expected_return_date: dayjs().toDate()
            })
        ).rejects.toEqual(new AppError("The rental minimum is 24 hours"))
    });
});