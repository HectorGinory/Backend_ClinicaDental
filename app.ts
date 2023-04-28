import express from 'express';
import mongoose from 'mongoose';
import routerUser from './entities/user/router.js';
import routerQuote from './entities/quote/router.js';
import config from './config.js';
import routerUser from './entities/user/router.js';

const app = express();

<<<<<<< HEAD
mongoose.connect(config.DDBB).then(()=>{
    console.log('connected to the database')
=======
mongoose.connect(config.DDBB!).then(()=>{
    console.log('Connected to the database')
>>>>>>> origin/hectordev
}).catch(()=>{
    console.log('Failed to connect database')
})

const handlerError = (err:Error,req,res,next)=>{
    if(err.message === 'NOT_EXIST_USER'){
      return res.status(404).json({code:'NOT_EXIST_USER',message:'Not exist this user'});
    }
    if(err.message === 'NOT_CANT_UPDATE'){
      return res.status(404).json({code:'NOT_CANT_UPDATE',message:'There is nothing to update'});
    }
    return res.status(500).json({code:'SERVER_ERROR',message:err.message});
    
};

app.use(express.json());
<<<<<<< HEAD
app.use('/user',routerUser);
=======
app.use('/user', routerUser)
app.use('/quote', routerQuote)
>>>>>>> origin/hectordev
app.use(handlerError);
app.listen(config.PORT, () => console.log('Server up in port 3000'));
