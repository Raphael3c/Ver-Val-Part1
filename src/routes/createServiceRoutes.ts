import { Router } from "express";
import { createService } from "../controllers/createService";

export const router = Router();

router.post('/', function(req, res) {
    createService(req, res);
});