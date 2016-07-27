var express = require('express');
var router = express.Router();
var DRController = require('../controllers/DRController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    DRController.list(req, res);
});

/*
 * GET
 */
router.get('/:id :term', function (req, res) {
    req.params.term && DRController.search(req, res); 
    DRController.show(req, res);
});


/*
 * GET
 */
router.get('/:term', function (req, res) {
    DRController.search(req, res);
});


/*
 * POST
 */
router.post('/', function (req, res) {
    DRController.create(req, res);
});

/*
 * PUT
 */
router.put('/:id', function (req, res) {
    DRController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    DRController.remove(req, res);
});

module.exports = router;
