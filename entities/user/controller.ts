import Users, { USER_ROLS } from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NO_USER')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('WRONG_PASSWORD')
    const token = jwt.sign({email: user.email, id: findUser._id, rol: findUser.rol}, config.SECRET)
    return token
}

export const searchUserById = async(id, token)=>{
    if(token.rol === USER_ROLS.CLIENT && token.id === id){
        const user = await Users.findOne({_id:id});
        return user
    } else if (token.rol === USER_ROLS.DENTIST) {
        const user = await Users.findOne({_id:id});
        if(token.id !== id && user?.rol !== USER_ROLS.CLIENT) throw new Error('NOT_AUTHORIZED')
        return user
    } else if(token.rol === USER_ROLS.ADMIN){
        const user = await Users.findOne({_id:id});
        return user
    }
    throw new Error('NOT_AUTHORIZED');
};

export const createUser = async(newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 1);
    const user =  new Users(newUser);
    return await user.save();
};

export const updateUser = async(id, body, token) => {
    if((token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) && id === token.id) {
        const userUpdate = await Users.updateOne({_id:id},body,token);
        if(!userUpdate) throw new Error('NO_USER');
        return userUpdate;
    } else if(token.rol === USER_ROLS.ADMIN) {
        const userUpdate = await Users.updateOne({_id:id},body);
        return userUpdate;
    } 
    throw new Error('NOT_AUTHORIZED')
};

export const getUsers = async(token) => {
    if(token.rol === USER_ROLS.ADMIN) {
        return await Users.find({})
    } 
    throw new Error('NOT_AUTHORIZED')
}