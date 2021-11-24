const express = require('express');
const populationController = require('../controllers/population');

const router = express.Router();

router.get('/:year', populationController.getByYear);
router.get('/', populationController.getData);

module.exports = router;