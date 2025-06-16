import { Router } from "express";
import { fetchPublishedPosts, generatePost } from "../controllers/post.controllers";

const router = Router();

router.get("/fetch-posts", fetchPublishedPosts);
router.post("/generate", generatePost);

export default router;