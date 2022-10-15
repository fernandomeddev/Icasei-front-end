require('dotenv')
const  authSecret = process.env.SECRET
const passport = require('passport')
const passportJwt = require('passport-jwt')
const { Strategy, ExtractJwt } = passportJwt
const IndividualModel = require('../models/IndividualModel')

module.exports = app => {
    const params = {
        secretOrKey: authSecret,
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }


    
    const strategy = new Strategy(params, (payload, done) => {
        
        IndividualModel.findOne({ _id : payload.id })
        .then(user => done(null, user ? { ...payload } : false))
        .catch(err => done(err, false))
    
    })
    

    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', { session: false })
    }
}