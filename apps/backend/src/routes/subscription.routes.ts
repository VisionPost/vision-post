import { Router } from "express";
import express from 'express';
import { webhookHandler } from "../controllers/webhooks.controllers";

const router = Router();

router.post("/webhook", express.raw({ type: 'application/json' }), webhookHandler);

export default router;