import { CarsRepositoryInMemory } from "../../repositories/inMemory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase"


let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepositoryInMemory: CarsRepositoryInMemory
describe ("Listagem de carros", ()=>{

    beforeEach(()=>{
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepositoryInMemory);
    })

    it("Should by list all avaliable cars",async ()=>{
        
        const car = await carsRepositoryInMemory.create({
            name: "Name", 
            description: "Description", 
            daily_rate: 11111,
            license_plate: "licensePlace",
            fine_amount: 22222,
            brand: "brand",
            category_id: "uuidCategory"
        })
        const cars = await listAvailableCarsUseCase.execute({});
        //console.log(cars)
        expect(cars).toEqual([car])
    })

    it("Should by list all avaliable cars by category",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Name2", 
            description: "Description2", 
            daily_rate: 111112,
            license_plate: "licensePlace2",
            fine_amount: 222223,
            brand: "brand2",
            category_id: "uuidCategory2"
        })
        const cars = await listAvailableCarsUseCase.execute({category_id:"uuidCategory2"});
        //console.log(cars)
        expect(cars).toEqual([car])
        //expect()
    })

    it("Should by list all avaliable cars by brand",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Name3", 
            description: "Description3", 
            daily_rate: 111113,
            license_plate: "licensePlace3",
            fine_amount: 222224,
            brand: "brand3",
            category_id: "uuidCategory3"
        })
        const cars = await listAvailableCarsUseCase.execute({category_id:"brand3"});
        //console.log(cars)
        expect(cars).toEqual([car])
        //expect()
    })

    it("Should by list all avaliable cars by name",async ()=>{
        const car = await carsRepositoryInMemory.create({
            name: "Name4", 
            description: "Description4", 
            daily_rate: 111114,
            license_plate: "licensePlace4",
            fine_amount: 222225,
            brand: "brand4",
            category_id: "uuidCategory4"
        })
        const cars = await listAvailableCarsUseCase.execute({category_id:"brand4"});
        //console.log(cars)
        expect(cars).toEqual([car])
        //expect()
    })
})