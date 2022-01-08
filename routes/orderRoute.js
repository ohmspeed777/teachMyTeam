const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrict } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', protect, orderController.createOrder);
router.get('/:id', protect, orderController.getOneOrder);

module.exports = router;
