const express = require('express');
const router = express.Router();
const expenseController = require('../controller/expense.controller');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/', auth, upload.single('bill_image'), expenseController.createExpense);
router.get('/', auth, expenseController.getAllExpenses);
router.get('/search/date', auth, expenseController.searchByDate);
router.put('/:id', auth, expenseController.updateExpense);


module.exports = router;