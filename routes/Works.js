var express = require('express');
var router = express.Router();
var WorkController = require('../controllers/WorkController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    WorkController.list(req, res);
});

/*
 * GET
 */
router.get('/:id', function (req, res) {
    WorkController.show(req, res);
});

/*
 * POST
 */
router.post('/', function (req, res) {
    WorkController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    WorkController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    WorkController.remove(req, res);
});

module.exports = router;
