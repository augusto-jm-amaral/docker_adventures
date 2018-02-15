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

const runningMessage = `App running on port ${process.env.PORT}`

app.listen(process.env.PORT, () => console.log(runningMessage))
