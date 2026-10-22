import { Router } from "express"
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  followUserController,
  getFollowersCountController,
  getFollowingCountController,
  loginUserController,
  deleteUserByEmailController,
} from "../controllers/user.js"

const router = Router()

router.post("/login", loginUserController)
router.post("/register", createUserController)
router.post("/:currentUser/follow/:userToFollow", followUserController)
router.get("/:userId/followers", getFollowersCountController)
router.get("/:userId/following", getFollowingCountController)
router.get("/:userId", getUserByIdController)
router.get("/", getAllUsersController)
router.delete("/", deleteUserByEmailController)

export default router
