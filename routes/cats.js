const { Router } = require('express')
const { Cat } = require('./../models')

const router = Router()

router.get('/', (req, res) => {
  Cat.find({}, (err, cats) => {
    if (err) {
      throw new Error(err)
    }

    res.json(cats)
  })
})

router.post('/', (req, res) => {
  const cat = new Cat(req.body)

  Cat.create(cat, (err, cat) => {
    if (err) {
      throw new Error(err)
    }

    res.status(201).json(cat)
  })
})

router.put('/:_id', (req, res) => {
  const _id = req.params._id
  const cat = req.body
  cat.updateAt = Date.now()

  Cat.findByIdAndUpdate(_id, cat, (err, cat) => {
    if (err) {
      throw new Error(err)
    }

    res.json(cat)
  })
})

router.delete('/:_id', (req, res) => {
  const _id = req.params._id

  Cat.findByIdAndRemove(_id, (err, cat) => {
    if (err) {
      throw new Error(err)
    }

    res.json(cat)
  })
})  

module.exports = router
