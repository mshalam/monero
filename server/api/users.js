const router = require('express').Router()
const axios = require('axios')

router.get('/', async (req, res, next) => {
  try {
    let result = await axios.get(process.env.cmcApi)
    res.send(result.data)
  } catch (err) {
    next(err)
  }
})

router.get('/reward', async (req, res, next) => {
  try {
    let result = await axios.get('https://moneroblocks.info/api/get_stats')
    res.send(result.data)
  } catch (err) {
    next(err)
  }
})

module.exports = router
