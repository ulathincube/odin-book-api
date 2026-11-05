import { Router } from "express"
import {
  getAllCommentsController,
  createCommentController,
  likeCommentController,
} from "../controllers/comment.js"

const router = Router()

router.post("/:postId/comment/:commentId", likeCommentController)
router.get("/:postId", getAllCommentsController)
router.post("/:postId", createCommentController)

export default router
