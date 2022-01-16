import { SpecificationsRepositoryInMemory } from "../../../../modules/cars/repositories/inMemory/SpecificationsRepositoryInMemory";
import { AppError } from "../../../../shared/errors/AppError";
import { CarsRepositoryInMemory } from "../../../cars/repositories/inMemory/CarsRepositoryInMemory";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";


let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory;
let specificationsRepositoryInMemory: SpecificationsRepositoryInMemory

describe("Create car specification", ()=>{
    beforeEach(()=> {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        specificationsRepositoryInMemory = new SpecificationsRepositoryInMemory();
        createCarSpecificationUseCase = new CreateCarSpecificationUseCase(
            carsRepositoryInMemory,
            specificationsRepositoryInMemory);
    });

    it("Should be able to add a new specification to the car", async ()=>{
        const car = await carsRepositoryInMemory.create({
            
            name: "Name", 
            description: "Description", 
            daily_rate: 11111,
            license_plate: "licensePlace",
            fine_amount: 22222,
            brand: "brand",
            category_id: "uuidCategory"
        })

        const specification = await specificationsRepositoryInMemory.create({
            description: "test",
            name: "test"
        });

        const specifications_id = [specification.id]
        const specificationsCars = await createCarSpecificationUseCase.execute({
            car_id:car.id, 
            specifications_id})
        expect(specificationsCars).toHaveProperty("specifications")
        expect(specificationsCars.specifications.length).toBe(1);
    })


    it("Should not be able to add a new specification to a now-existent car",
     async ()=>{
        const car_id = "1234"
        const specifications_id = ["12345"]
        await expect(
        createCarSpecificationUseCase.execute({
            car_id, 
            specifications_id
        })
        ).rejects.toEqual(new AppError("Car does not exists!"))
        
    })
})

//se erro can' read property '' of undefined.
//solução: o que vem antes do metodo retorna nulo, vazio ou não instanciada.