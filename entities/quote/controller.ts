import Users, { USER_ROLS } from '../user/model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';
import Quote from './model.js';

export const createQuote = async (newQuote, token) => {
    if(!newQuote.quote) throw new Error("INFO_LEFT")
    if(token.rol === USER_ROLS.CLIENT) {
        if(!newQuote.dentist) throw new Error("INFO_LEFT")
        newQuote.customer = token.id
    }
    if(token.rol === USER_ROLS.DENTIST) {
        if(!newQuote.customer) throw new Error("INFO_LEFT")
        newQuote.dentist = token.id
    }
    if(token.rol === USER_ROLS.ADMIN && (!newQuote.customer || !newQuote.dentist)) throw new Error("INFO_LEFT")
    newQuote.dateOfQuote = new Date(newQuote.dateOfQuote)
    newQuote.endOfQuote = new Date(newQuote.endOfQuote)
    if(await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer)) {
        throw new Error('DENTIST_IN_OTHER_QUOTE')
    }
    let quote = new Quote(newQuote)
    return await quote.save()
}

const checkQuoteConcur = async(dateStart, dateEnd, dentistQuote, customerQuote) => (await Quote.findOne({$and: [{$or: [{dentist: dentistQuote}, {customer: customerQuote}]}, {$or:[{$and: [{dateOfQuote: {$gt: dateStart}}, {dateOfQuote: {$lt: dateEnd}}]},{$and: [{endOfQuote: {$gt: dateStart}}, {endOfQuote: {$lt: dateEnd}}]}]}]}))

const modifiedQuote = async (quoteId, token) => {
    const quote = Quote.find({_id: quoteId})
}