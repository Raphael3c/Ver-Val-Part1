import { Router } from "express";
import { scheduleService } from "../controllers/scheduleService";

export const router = Router();

router.post('/', function(req, res) {
    scheduleService(req, res);
});