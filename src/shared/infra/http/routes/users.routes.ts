import {Router} from 'express';
import { CreateUserUseController } from '../../../../modules/accounts/useCases/createUser/CreateUserController';
import { UpdateUserAvatarController } from '../../../../modules/accounts/useCases/updateUserAvatar/UpdateUserAvatarController';
import multer from "multer";
import uploadConfig from "../../../../config/upload";
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import {ProfileUserController} from "../../../../modules/cars/useCases/profileUserUseCase/ProfileUserController"

const usersRoutes = Router();
const uploadAvatar = multer(uploadConfig)

const createUserController = new CreateUserUseController();
const updateUserAvatarController = new UpdateUserAvatarController();
const profileUserController = new ProfileUserController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.patch("/avatar", 
ensureAuthenticated,
uploadAvatar.single("avatar"),
updateUserAvatarController.handle)

usersRoutes.get("/profile", ensureAuthenticated, profileUserController.handle)

export {usersRoutes}