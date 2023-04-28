import express from 'express';
import { auth } from '../../services.js';
import {createQuote } from './controller.js'

const router = express.Router();

router.post("/", auth ,async (req, res, next) => {
    try {
        await createQuote(req.body, req.token);
        return res.json("Create quote");
    } catch (error) {
        next(error);
    }
})

// router.

export default router;
