var express = require('express');
var router = express.Router();
var NameController = require('../controllers/NameController.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    NameController.list(req, res);
});

/*
 * GET
 */
// router.get('/:id', function (req, res) {
//     NameController.show(req, res);
// });

/*
 * GET
 */
router.get('/:term', function (req, res) {
    NameController.search(req, res);
});


/*
 * POST
 */
router.post('/', function (req, res) {
    NameController.create(req, res);
});

/*
 * PUT
 */
router.put('/:oldname/:newname', function (req, res) {
    NameController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    NameController.remove(req, res);
});

module.exports = router;
