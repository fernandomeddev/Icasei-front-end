const IndividualModel = require('../models/IndividualModel')

module.exports = app => {
    const { existsOrError, notExistsOrError } = app.api.validation

    const save = async (req, res) => {
        const {name, email} = req.body

        try {
            existsOrError(name, 'Nome não informado')
            existsOrError(email, 'E-mail não informado')
            
            const individual = await IndividualModel.findOne({ email: email })

            if(individual) {
                notExistsOrError(userFromDB, 'Usuário já cadastrado')
            }
        } catch(msg) {
            return res.status(400).send(msg)
        }

        const newUser = new IndividualModel({
            name,
            email
        })

        try {

            await newUser.save()
            res.status(201).json({msg:'cadastrado com sucesso!'})

        } catch (error) {

            console.log(error)
            res.status(500).json({msg: "tente novamente mais tarde"})
        }
    }
    
    const getById = async (req, res) => {
        const id = req.params.id
        const individual = await IndividualModel.findOne({_id : id}).exec()

        if(!individual){
            return res.status(404).send('usuário não econtrado')
        }

        return res.status(200).send('usuário encontrado com sucesso!')

    }

    return {save, getById}
}