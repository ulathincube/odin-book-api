import { Router } from "express"
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
} from "../controllers/user.js"

const router = Router()

router.get("/:userId", getUserByIdController)
router.get("/", getAllUsersController)
router.post("/", createUserController)

export default router
