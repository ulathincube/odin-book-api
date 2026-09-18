import { Router } from "express"
import {
  getPostController,
  getAllPostsController,
  getAllPostsByUserIdController,
  createPostController,
} from "../controllers/post.js"

const router = Router()

router.get("/user/:postId", getAllPostsByUserIdController)
router.get("/:postId", getPostController)
router.get("/", getAllPostsController)
router.post("/", createPostController)

export default router
