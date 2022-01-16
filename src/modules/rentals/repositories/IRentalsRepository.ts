import { ICreateRentalDTO } from "../dtos/ICreateRentalDTO";
import { Rental } from "../infra/typeorm/entities/Rental";

interface IRentalsRepository {
    findOpenRentalsByCar(car_id:string): Promise<Rental>
    findOpenRentalsByUser(user_id:string): Promise<Rental>
    create(data: ICreateRentalDTO):Promise<Rental>
    findById(id: string): Promise<Rental>
    findByUser(user_id: string): Promise<Rental[]>
}

export {IRentalsRepository}