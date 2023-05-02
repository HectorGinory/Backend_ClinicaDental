import express from 'express';
import mongoose from 'mongoose';
import routerUser from './entities/user/router.js';
import routerQuote from './entities/quote/router.js';
import config from './config.js';

const app = express();

mongoose.connect(config.DDBB!).then(()=>{
    console.log('Connected to the database')
}).catch(()=>{
    console.log('Failed to connect database')
})

const handlerError = (err:Error,req,res,next)=>{
    if(err.message === 'NO_USER'){
      return res.status(404).json({code:'NO_USER',message:"This user don't exist"});
    }
    if(err.message === 'WRONG_PASSWORD'){
      return res.status(404).json({code:'WRONG_PASSWORD',message:'Wrong password to log in'});
    }
    if(err.message === 'NOT_AUTHORIZED'){
      return res.status(404).json({code:'NOT_AUTHORIZED',message:'You dont have authorization to do this action'});
    }
    if(err.message === 'NO_TOKEN'){
      return res.status(404).json({code:'NO_TOKEN',message:'There was an error with the log in, try again'});
    }
    if(err.message === 'INFO_LEFT'){
      return res.status(404).json({code:'INFO_LEFT',message:"There's info left to do this action"});
    }
    if(err.message === 'CANT_CREATE_QUOTE'){
      return res.status(404).json({code:'CANT_CREATE_QUOTE',message:"The dentist/customer have a quote in that period of time"});
    }
    if(err.message === 'NO_QUOTE'){
      return res.status(404).json({code:'NO_QUOTE',message:"This quote dont exist"});
    }
    return res.status(500).json({code:'SERVER_ERROR', message: err.message});
    
};

app.use(express.json());
app.use('/user', routerUser)
app.use('/quote', routerQuote)
app.use(handlerError);
app.listen(config.PORT, () => console.log(`Server up in port ${config.PORT}`));
