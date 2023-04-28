import express from 'express';
import { auth } from '../../services.js';
import {createQuote, modifiedQuote } from './controller.js'

const router = express.Router();

router.post("/", auth ,async (req, res, next) => {
    try {
        return res.json(await createQuote(req.body, req.token));
    } catch (error) {
        next(error);
    }
})

router.patch("/:id", auth, async(req, res, next) => {
    try {
        return res.json(await modifiedQuote(req.params.id, req.body, req.token))
    } catch(e) {
        next(e)
    }
})

export default router;
