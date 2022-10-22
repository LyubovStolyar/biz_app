var express = require('express');
var router = express.Router();
const services = require('../controllers/services');

router.get('/', services.getService);
router.post('/', services.addService);
router.put('/', services.updateService);
router.delete('/', services.deleteService);

module.exports = router;