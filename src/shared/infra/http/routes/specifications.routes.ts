import {Router} from 'express'
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateSpecificationController } from '../../../../modules/cars/useCases/createSpecification/CreateSpecificationController';
import { ensureAdmin } from '../middlewares/ensureAdmin';

const specificationsRoutes = Router();
const createSpecificationController = new CreateSpecificationController();

specificationsRoutes.use(ensureAuthenticated);//linha
specificationsRoutes.post("/", 
    ensureAdmin, //se erro passar ensureAuthen... antes da ensureadmin e apagar linha
    createSpecificationController.handle);

export {specificationsRoutes}