import express from 'express';
import { auth } from '../../services.js';
import {createQuote, updateQuote} from './controller.js'

const router = express.Router();

router.post("/", auth ,async (req, res, next) => {
    try {
        if(req.token.rol !== "Cliente") throw new Error("NO_PERMISSION")
        await createQuote(req.body, req.token);
        return res.json("Create quote");
    } catch (error) {
        next(error);
    }
})

router.patch("/:id", auth ,async (req, res, next) => {
    try {
        if(req.token.rol !== "Dentista") throw new Error("NO_PERMISSION")
        await updateQuote(req.body, req.token);
        return res.json("Quote updated");
    } catch (error) {
        next(error);
    }
})

export default router;
