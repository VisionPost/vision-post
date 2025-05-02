import { Router } from "express";
import { getContributions } from "../controllers/contributions.controllers";

const router = Router();

router.get("/", getContributions);

export default router;