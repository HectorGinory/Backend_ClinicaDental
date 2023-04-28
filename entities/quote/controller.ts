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
    console.log(await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer))
    if((await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer)).length !== 0) {
        throw new Error('OTHER_QUOTE_EXIST')
    }
    let quote = new Quote(newQuote)
    await quote.save()
    return quote
}

const checkQuoteConcur = async(dateStart, dateEnd, dentistQuote, customerQuote) => (await Quote.find({$and: [{$or: [{dentist: dentistQuote}, {customer: customerQuote}]}, {$or:[{$and: [{dateOfQuote: {$gt: dateStart}}, {dateOfQuote: {$lt: dateEnd}}]},{$and: [{endOfQuote: {$gt: dateStart}}, {endOfQuote: {$lt: dateEnd}}]}]}, {activeQuote: true}]}))

export const modifiedQuote = async (quoteId,newQuote, token) => {
    if(!quoteId || !newQuote || !token) throw new Error("INFO_LEFT")
    let quote = await Quote.findOne({_id: quoteId})
    if(!quote) throw new Error("NO_QUOTE")
    if(token.rol === USER_ROLS.ADMIN || ((token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) && (quote.customer?.toString() === token.id || quote.dentist?.toString() === token.id))) {
        newQuote.updateAt = new Date()
        if(newQuote.activeQuote === true && (await checkQuoteConcur(newQuote.dateOfQuote,newQuote.endOfQuote,newQuote.dentist, newQuote.customer)).length !== 0) throw new Error('OTHER_QUOTE_EXIST')
        await Quote.updateOne({_id: quoteId}, newQuote)
        return quote
    } else {
        throw new Error("NO_PERMISSION")
    }
}

export const deleteQuote = async (quoteId, token, req) => {
    if(!quoteId || !token || !req) throw new Error("INFO_LEFT")
    let quote = await Quote.findOne({_id: quoteId})
    if(!quote) throw new Error("NO_QUOTE")
    if(token.rol === USER_ROLS.ADMIN || ((token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.DENTIST) && (quote.customer?.toString() === token.id || quote.dentist?.toString() === token.id))) {
        req.updateAt = new Date()
        req.deleteAt = req.updateAt
        req.activeQuote = false
        await Quote.updateOne({_id: quoteId}, req)
        return quote
    } else {
        throw new Error("NO_PERMISSION")
    }
}