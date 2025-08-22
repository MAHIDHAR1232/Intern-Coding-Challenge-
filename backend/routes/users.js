const express = require('express');
const router = express.Router();
const { auth, requireRole } = require('../middlewares/auth');
const { getUsers, createUser, updateUser, deleteUser, getDashboard } = require('../controllers/userController');
const { userValidation } = require('../utils/validation');

router.get('/dashboard', auth, requireRole(['admin']), getDashboard);
router.get('/', auth, requireRole(['admin']), getUsers);
router.post('/', auth, requireRole(['admin']), userValidation, createUser);
router.put('/:id', auth, userValidation, updateUser);
router.delete('/:id', auth, requireRole(['admin']), deleteUser);

module.exports = router; 