const express = require('express');
const router = express.Router();
//controller
const adminController = require('app/http/controllers/admin/adminController');
router.get('/', adminController.index);
router.get('/products', adminController.products);
module.exports = router;