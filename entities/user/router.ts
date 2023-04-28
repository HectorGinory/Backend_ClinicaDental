import express from 'express';
import { auth } from '../../services.js';
import {searchUserById,listSearchUser,createUser,updateUser,deleteUser,userLogIn} from './controller.js';

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

router.get('/',async (req, res, next) => {
   
    try {
        const user = await listSearchUser(req.query);
        return res.json(user);
    } catch (error) {
        next(error);
    }
});

router.get('/:id',async(req,res,next)=>{

    try {
        const user = await searchUserById(req.params.id);
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

router.put('/:id',async (req, res, next) => {
    
    try {
        const user = await updateUser(req.params.id,req.body);
        if(user.upsertedCount == 0){
            return next(new Error('NOT_CANT_UPDATE'));
        }
<<<<<<< HEAD
        return res.json(user);
    } catch (error) {
        next(error);
=======
        return res.json({token});
    } catch (e) {
        next(e);
>>>>>>> origin/hectordev
    }
});

router.delete('/:id',async (req, res, next) => {
    
    try {
        const user = await deleteUser(req.params.id);
        if (user.deletedCount == 0) {
            return next(new Error('NOT_EXIST_USER'));
        }
        return res.json(user);
    } catch (error) {
        next(error);
    }
    
});

export default router;