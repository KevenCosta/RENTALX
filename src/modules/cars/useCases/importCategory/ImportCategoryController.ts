import {Request, Response} from "express"
import {ImportCategoryUseCase} from "./ImportCategoryUseCase"
import {container} from "tsyringe"


class ImportCategoryController{


    async handle(request: Request, response:Response): Promise<Response>{
        const {file} = request;
        const importCategoryUseCase = container.resolve(ImportCategoryUseCase)
        await importCategoryUseCase.execute(file);//tira this pq n está no escopo da classe
        return response.status(201).send();
    }
}

export {ImportCategoryController}