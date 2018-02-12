const express = require('express')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const catsRouter = require('./routes/cats')

const app = express()

app.use(bodyParser.urlencoded({
  extended: true,
}))
app.use(bodyParser.json())
app.use(methodOverride())

app.get('/status', (req, res) => { res.send('OK!') })

app.use('/cats', catsRouter)

app.use((err, req, res, next) => {
    res.status(500).send({ error: 'Something failed!' })
})

app.listen('3000', () => console.log('App running on port 3000'))
