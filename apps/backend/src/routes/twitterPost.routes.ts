import { Router } from "express";
import { postToTwitter } from "../controllers/twitterPost.controllers";

const router = Router();

router.post("/", postToTwitter);

export default router;