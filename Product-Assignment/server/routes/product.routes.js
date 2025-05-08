const express = require('express');
const { getTasks, createTask, updateTask, deleteTask, getTaskById, insertMultipleProducts } = require('../controllers/product.controller');
const router = express.Router();

router.get('/', getTasks);

router.post('/', createTask);

router.post('/multiple-products',insertMultipleProducts)

router.put('/:id', updateTask);

router.delete('/:id', deleteTask);

router.get('/:id', getTaskById);



module.exports = router;