import Users, { USER_ROLS } from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser){
        throw new Error('NOT_EXIST_USER')
    }
    if(!(await bcrypt.compare(user.password, findUser.password))){
        throw new Error('NOT_EXIST_USER')
    }
    const token = jwt.sign({email: user.email, id: findUser._id, rol: findUser.rol}, config.SECRET)
    return token
}

export const searchUserById = async(id, token)=>{

    if(token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST){
        if(token.id !== id){
          throw new Error('NOT_AUTHORIZED');
        }
        const user = await Users.findOne({_id:id},token);
        return user
    }
    if(token.rol === USER_ROLS.ADMIN){
        const user = await Users.find({});
        return user
    }
    else{
        throw new Error('SERVER_ERROR')
    }

};

export const createUser = async(newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 1);
    const user =  new Users(newUser);
    return await user.save();
};

export const updateUser = async(id, body, token) => {

    if(token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) {
        const user = await Users.findOne({_id:id});
        if(!user) {
          throw new Error('USER_NOT_FOUND');
        }
        if(token.id !== id) {
          throw new Error('NOT_AUTHORIZED');
        }
        const userUpdate = await Users.updateOne({_id:id},body,token);
        return userUpdate;
    }

    if(token.rol === USER_ROLS.ADMIN) {
        const userUpdate = await Users.updateOne({_id:id},body);
        return userUpdate;
    } else {
        throw new Error('SERVER_ERROR')
    }
};



