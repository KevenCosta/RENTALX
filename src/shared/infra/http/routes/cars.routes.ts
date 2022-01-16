import { Router } from "express"
import { CreateCarController } from "../../../../modules/cars/useCases/createCar/CreateCarController"
import { ListCategoriesController } from "../../../../modules/cars/useCases/listCategories/ListCategoriesController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateSpecificationController } from "../../../../modules/cars/useCases/createSpecification/CreateSpecificationController";
import { UploadCarImagesController } from "../../../../modules/cars/useCases/uploadCarImages/UploadCarImagesController";
import multer from "multer";
import uploadConfig from "../../../../config/upload";

const carsRoutes = Router ()

const createCarController = new CreateCarController();
const listAvailableCarsController = new ListCategoriesController();
const createCarSpecificationController = new CreateSpecificationController();
const uploadCarImagesController = new UploadCarImagesController();

const upload = multer(uploadConfig)

carsRoutes.post("/", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarController.handle);

carsRoutes.get("/available", listAvailableCarsController.handle)
carsRoutes.post("/specifications/:id", 
    ensureAuthenticated, 
    ensureAdmin, 
    createCarSpecificationController.handle)
carsRoutes.post("/images/:id", 
    ensureAuthenticated, 
    ensureAdmin,
    upload.array("images"), 
    uploadCarImagesController.handle)


export {carsRoutes}