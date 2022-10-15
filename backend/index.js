require('dotenv').config()
const app = require("express")()
const consign = require('consign')

require('./config/mongodb')

consign()
.include('./config/passport.js')
.then('./config/middlewares.js')
.then('./api/validation.js')
.then('./api')
.then('./config/routes.js')
.into(app)

app.get('/', (req, res) => {
    res.status(200).json({ msg:"welcome to my API!"})
})

app.listen(3333)
