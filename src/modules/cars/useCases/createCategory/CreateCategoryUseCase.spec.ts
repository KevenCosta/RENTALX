//Teste Unitário

import { AppError } from "../../../../shared/errors/AppError";
import { CategoriesRepositoryInMemory } from "../../repositories/inMemory/CategoryRepositoryInMemory";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase"

    let createCategoryUseCase : CreateCategoryUseCase;
    let categoriesRepositoryInMemory: CategoriesRepositoryInMemory;
describe("Create category", ()=>{
    
    beforeEach(()=>{
        categoriesRepositoryInMemory = new CategoriesRepositoryInMemory();
        createCategoryUseCase = new CreateCategoryUseCase(
            categoriesRepositoryInMemory);
    });

    it("Should be able to create a new category", async ()=>{
       const category = {
            name: "Category test",
            description: "Category description test",
       }
       
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        const categoryCreated = await categoriesRepositoryInMemory.findByName(category.name);
        expect(categoryCreated).toHaveProperty("id");
    });

    it("Should not be albe to create a new category with name exists", async ()=>{
        
        const category = {
            name: "Category test",
            description: "Category description test",
       }
       
        await createCategoryUseCase.execute({
            name: category.name,
            description: category.description
        });

        await expect(
            createCategoryUseCase.execute({
               name: category.name,
               description: category.description
           })
        ).rejects.toEqual( new AppError("Category already exists!"));   
     });
});