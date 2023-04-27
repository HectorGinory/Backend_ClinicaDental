import Users, { USER_ROLS } from '../user/model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
import Quote from './model.js';

export const createQuote = async (newQuote, token) => {
    if(token.rol === USER_ROLS.CLIENT) {
        newQuote.customer = token.id
    }
    const dentist = await Users.findOne({rol: "Dentista", name: newQuote.dentist})
    if(!dentist) throw new Error
    newQuote.dentist = dentist._id
    let quote = new Quote(newQuote)
    return await quote.save()
}