import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const listSearchUser = async(data) => {
    if(data.name){
        const user = await Users.findOne({name:data});
        return user;
    } else if(data.email){
        const user = await Users.findOne({email:data});
        return user;
    } 
    else{
        const user = await Users.find({});
        return user;
    }
};

export const searchUserById = async(id)=>{
    const user = await Users.findOne({_id:id});
    return user
};

export const createUser = async(newUser) => {
    const user =  new Users(newUser);
    user.password = await bcrypt.hash(newUser.password, 1);
    return await user.save();
};