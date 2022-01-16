import { CreateCarUseCase } from "./CreateCarUseCase";
import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";

let carsRepositoryInMemory: CarsRepositoryInMemory;
let createCarUseCase: CreateCarUseCase;

describe("Create car", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarUseCase = new CreateCarUseCase(carsRepositoryInMemory)
    });
    //ok
    it("Should be able to create a new car", async ()=>{
        const car = {
            name: "Name", 
            description: "Description", 
            daily_rate: 11111,
            license_plate: "licensePlace",
            fine_amount: 22222,
            brand: "brand",
            category_id: "uuidCategory"
        }
        const carRetorno = await createCarUseCase.execute(car)
        expect(carRetorno).toHaveProperty("id");
    });

    //teste sem reject n retorna erro, recebe undefined se carro igual
    it("should not be able to create a car with exists license_plate",async  ()=>{
        
        const car = {
            name: "Name", 
            description: "Description", 
            daily_rate: 11111,
            license_plate: "licensePlace",
            fine_amount: 22222,
            brand: "brand",
            category_id: "uuidCategory"
        }
        
        await createCarUseCase.execute(car)
        car.name += "2"
        await expect(
            createCarUseCase.execute(car)
        ).rejects.toEqual(new AppError("Car already exists!"))
    })
    //ok
    it("should be able to create a car with available true by default", ()=>{
        expect(async ()=>{
            const car = {
                name: "Name", 
                description: "Description", 
                daily_rate: 11111,
                license_plate: "licensePlace",
                fine_amount: 22222,
                brand: "brand",
                category_id: "uuidCategory"
            }
            
            const carRetorno = await createCarUseCase.execute(car)
            
            expect(carRetorno.available).toBe(true)   
        })
    })
});