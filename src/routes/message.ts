import { Router } from "express"
import {
  getMessageController,
  createMessageController,
  getAllMessagesController,
} from "../controllers/message.js"

const router = Router()

router.get("/:messageId", getMessageController)
router.post("/", createMessageController)
router.get("/", getAllMessagesController)

export default router
