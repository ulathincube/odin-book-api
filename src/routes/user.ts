import { Router } from "express"
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  getUserByEmailController,
} from "../controllers/user.js"

const router = Router()

router.post("/user/auth", getUserByEmailController)
router.get("/:userId", getUserByIdController)
router.get("/", getAllUsersController)
router.post("/", createUserController)

export default router
