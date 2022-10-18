const jwt = require('jwt-simple')
const IndividualModel = require('../models/IndividualModel')

require('dotenv')

const authSecret = process.env.SECRET


module.exports = app => {
    const signin = async (req, res) => {

        if(!req.body.email){
            return res.status(400).send('informe usuário e senha!')
        }

        const individual = await IndividualModel.findOne({ email: req.body.email })
        if(!individual) return res.status(404).send('Usuário não econtrado')

        const now = Math.floor(Date.now() / 1000)

        const payload = {
            _id: individual.id,
            name: individual.name,
            email: individual.email,
            iat: now,
            exp: now + (60 * 60 * 24 * 3)
        }

        res.json({
            ...payload,
            token: jwt.encode(payload, authSecret)
        })

        //return res.status(200).send("Login efetuado com sucesso!")
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp * 1000) > new Date()) {
                    return res.send(true)
                }

                res.status(200).send('autenticado com sucesso', token)
            }
        } catch (error) {
            res.status(400)
        }

        res.send(false)
    }

    return { signin, validateToken }
}