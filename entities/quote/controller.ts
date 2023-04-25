import Users from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
import Quote from './model.js';

export const createQuote = async (newQuote, token) => {
    // newQuote.customer = token.id
    // newQuote.dentist = await Users.findOne({rol: "Dentista", name: newQuote.dentist})
    console.log(await Users.findOne({rol: "Dentista"}));
    // let quote = new Quote(newQuote)
    // return await quote.save()
}