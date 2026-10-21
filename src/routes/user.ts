import { Router } from "express"
import {
  getUserByIdController,
  getAllUsersController,
  createUserController,
  followUserController,
  getFollowersCountController,
  getFollowingCountController,
} from "../controllers/user.js"

const router = Router()

router.post("/register", createUserController)
router.post("/:currentUser/follow/:userToFollow", followUserController)
router.get("/:userId/followers", getFollowersCountController)
router.get("/:userId/following", getFollowingCountController)
router.get("/:userId", getUserByIdController)
router.get("/", getAllUsersController)

export default router
