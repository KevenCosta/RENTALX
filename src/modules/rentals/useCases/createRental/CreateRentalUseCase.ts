import "reflect-metadata" 
import { Rental } from "../../../../modules/rentals/infra/typeorm/entities/Rental"
import { IRentalsRepository } from "../../../../modules/rentals/repositories/IRentalsRepository"
import { AppError } from "../../../../shared/errors/AppError"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"
import { inject, injectable } from "tsyringe"
import { ICarsRepository } from "../../../../modules/cars/repositories/ICarsRepository"

//documentação exigi utc nas datas

interface IRequest {
    user_id: string;
    car_id: string;
    expected_return_date: Date;
}

@injectable()
class CreateRentalUseCase {
    constructor(
        @inject("RentalsRepository")
        private rentalsRepository: IRentalsRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider,
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ){}
    async execute({
        user_id, 
        car_id, 
        expected_return_date}:IRequest):Promise<Rental>{

        const carUnavailable = await this.rentalsRepository
        .findOpenRentalsByCar(car_id)

        if(carUnavailable) {
            throw new AppError("Car is unavailable")
        }

        const rentalOpenToUser = await this.rentalsRepository
        .findOpenRentalsByUser(user_id)

        if(rentalOpenToUser) {
            throw new AppError("There is a rentals in progress for user!")
        }

        const dateNow = this.dateProvider.dateNow();

        const rentalMinimum = 24;

        //compara a data
        const compare = this.dateProvider
        .compareInHours(dateNow, expected_return_date,)

        if(compare < rentalMinimum){
            throw new AppError("The rental minimum is 24 hours")
        }

        const rental = this.rentalsRepository.create({
            user_id,
            car_id,
            expected_return_date,
        });

        await this.carsRepository.updateAvailable(car_id, false)

        return rental
    }
}

export {CreateRentalUseCase}