import Users, { USER_ROLS } from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NOT_FOUND')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('NOT_FOUND')
    const token = jwt.sign({email: user.email, id: findUser._id}, config.SECRET)
    return token
}

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
    newUser.password = await bcrypt.hash(newUser.password, 1);
    // const as = Users.find({_id: newUser.dentist})
    // console.log(as);
    // if(!newUser.dentist) {
    //     newUser.dentist = "NO_DENTIST"
    //     console.log(newUser.dentist);
    // } else {
    //     newUser.dentist = newUser.dentist.toString()
    // }
    const user =  new Users(newUser);
    return await user.save();
};

export const updateUser = async(id,body) => {

    let user = await Users.updateOne({_id:id},body);
    return user;
};

export const deleteUser = async(id) => {
    const user = await Users.deleteOne({_id:id});
    return user;
};


