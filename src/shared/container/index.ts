import {container} from "tsyringe"
import { UsersRepository } from "../../modules/accounts/infra/repositories/UsersRepository"
import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import {ICategoriesRepository} from "../../modules/cars/repositories/ICategoriesRepository"
import {CategoriesRepository} from "../../modules/cars/infra/typeorm/repositories/CategoriesRepository"
import { SpecificationRepository } from "../../modules/cars/infra/typeorm/repositories/SpecificationsRepository"
import { ISpecificationsRepository } from "../../modules/cars/repositories/ISpecificationsRepository"
import { CarsRepository } from "../../modules/cars/infra/typeorm/repositories/CarsRepository"
import { ICarsRepository } from "../../modules/cars/repositories/ICarsRepository"
import { ICarsImagesRepository } from "../../modules/cars/repositories/ICarsImagesRepository"
import { CarsImagesRepository } from "../../modules/cars/infra/typeorm/repositories/CarsImagesRepository"
import { IRentalsRepository } from "../../modules/rentals/repositories/IRentalsRepository"
import { RentalsRepository } from "../../modules/rentals/infra/typeorm/repositories/RentalsRepository"
import "../../shared/container/providers"
import { IUsersTokensRepository } from "../../modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokensRepository } from "../../modules/accounts/infra/repositories/UsersTokensRepository"

container.registerSingleton<ICategoriesRepository>(
    "CategoriesRepository",
    CategoriesRepository
)

container.registerSingleton<ISpecificationsRepository>(
    "SpecificationRepository",
    SpecificationRepository
)

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<ICarsRepository>(
    "CarsRepository",
    CarsRepository
)

container.registerSingleton<ICarsImagesRepository>(
    "CarsImagesRepository",
    CarsImagesRepository
)

container.registerSingleton<IRentalsRepository>(
    "RentalsRepository",
    RentalsRepository
)

container.registerSingleton<IUsersTokensRepository>(
    "UsersTokensRepository",
    UsersTokensRepository
)