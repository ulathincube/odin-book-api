import { Router } from "express"
import {
  getPostController,
  getAllPostsController,
  getAllPostsByUserIdController,
  createPostController,
  likePostController,
} from "../controllers/post.js"

const router = Router()

router.get("/user/:userId", getAllPostsByUserIdController)
router.post("/:postId/like", likePostController)
router.get("/:postId", getPostController)
router.get("/", getAllPostsController)
router.post("/", createPostController)

export default router
