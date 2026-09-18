import { Router } from "express"
import {
  getProfileController,
  createProfileController,
} from "../controllers/profile.js"

const router = Router()

router.get("/:profileId", getProfileController)
router.post("/", createProfileController)

export default router
