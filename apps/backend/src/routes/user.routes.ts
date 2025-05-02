import { Router } from "express";
import { getUser } from "../controllers/user.controllers";

const router = Router();

router.get("/:id", getUser);

export default router;