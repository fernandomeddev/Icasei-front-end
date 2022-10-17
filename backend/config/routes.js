//const User = require("../models/User")
require('./passport')

module.exports = app => {

    app.post('/signup', app.api.individual.save)
    app.post('/signin', app.api.auth.signin)
    app.post('/validateToken', app.api.auth.validateToken)

    app.route('/user/:id')
        .get(app.api.individual.getById)

}