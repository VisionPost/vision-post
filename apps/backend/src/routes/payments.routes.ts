import { Router } from "express";
import { checkoutSubscription } from "../controllers/payments.controllers";

const router = Router();

router.post("/checkout/subscription", checkoutSubscription);

export default router;