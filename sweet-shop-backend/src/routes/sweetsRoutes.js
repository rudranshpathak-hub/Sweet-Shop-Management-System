const express = require('express');
const { getSweets, searchSweets, addSweet, updateSweet, deleteSweet, purchaseSweet, restockSweet } = require('../controllers/sweetsController');
const { authMiddleware, adminMiddleware } = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getSweets);
router.get('/search', authMiddleware, searchSweets);
router.post('/', authMiddleware, adminMiddleware, addSweet);
router.put('/:id', authMiddleware, adminMiddleware, updateSweet);
router.delete('/:id', authMiddleware, adminMiddleware, deleteSweet);
router.post('/:id/purchase', authMiddleware, purchaseSweet);
router.post('/:id/restock', authMiddleware, adminMiddleware, restockSweet);

module.exports = router;