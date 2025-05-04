import { Router } from "express";
import { getRepos } from "../controllers/repos.controllers";

const router = Router();

router.get("/", getRepos);

export default router;