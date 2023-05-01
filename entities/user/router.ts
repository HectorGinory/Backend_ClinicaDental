import express from 'express';
import { auth } from '../../services.js';
import {searchUserById,createUser,updateUser,userLogIn} from './controller.js';

const router = express.Router();

router.post('/login',async (req, res, next) => {

    try {
        const token = await userLogIn(req.body);
        if (!token) {
            return next(new Error('NOT_EXIST_USER'));
        }
        return res.json({token});
    } catch (e) {
        next(e);
    }

});

router.post('/logout', auth ,async (req, res, next) => {

    try {
        return res.json({Message:"Disconnected successfully"});
    } catch (e) {
        next(e);
    }

});

router.get('/:id', auth,async(req,res,next)=>{

    try {
        const user = await searchUserById(req.params.id, req.token);
        if (user == null) {
            return next(new Error('NOT_EXIST_USER'));
        }
        return res.json(user);
    } catch (error) {
        next(error);
    }

});

router.post('/',async (req, res, next) => {

    try {
        const newUser = await createUser(req.body);
        return res.json("Create User");
    } catch (error) {
        next(error);
    }

});

router.put('/:id', auth,async (req, res, next) => {
    
    try {
        const user = await updateUser(req.params.id, req.body, req.token);
        if(user.modifiedCount == 0 ){
            return next(new Error('NOT_CANT_UPDATE'));
        }
        return res.json("Modified user");
    } catch (e) {
        next(e);
    }
});


export default router;