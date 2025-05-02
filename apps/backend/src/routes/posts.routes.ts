import { Router } from "express";
import { generatePost } from "../controllers/post.controllers";

const router = Router();

router.post("/", generatePost);

export default router;