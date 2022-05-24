import { Router } from "express";
import { reschedule } from "../controllers/reschedule";

export const router = Router();

router.post('/', function(req, res) {
    reschedule(req, res);
});