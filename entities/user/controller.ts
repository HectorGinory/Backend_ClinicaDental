import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';


export const searchUserById = async(id)=>{
    const user = await Users.findOne({_id:id});
    return user
};

