import { Router } from "express";
import { processorPayment } from "../controllers/processorPayment";

export const router = Router();

router.post('/', function(req, res) {
    processorPayment(req, res);
});