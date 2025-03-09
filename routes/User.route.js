const {  createFormData, getAllFormData } = require('../controller/User.controller');

const router = require('express').Router();

router.post('/create', createFormData)
router.get('/get',getAllFormData )
 


module.exports = router;