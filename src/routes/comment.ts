import { Router } from "express"
import {
  getAllCommentsController,
  createCommentController,
} from "../controllers/comment.js"

const router = Router()

router.get("/:postId", getAllCommentsController)
router.post("/:postId", createCommentController)

export default router
