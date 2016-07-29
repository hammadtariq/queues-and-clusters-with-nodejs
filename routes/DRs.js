'use strict';

var express = require('express');
var router = express.Router();
var DRController = require('../controllers/DRController.js');
var analyzerQueue = require('../queue/analyzer.js');

/*
 * GET
 */
router.get('/', function (req, res) {
    //DRController.list(req, res);

    elapsed_time("start total process()");
    analyzerQueue.analyze("hammad",(result)=>{

            console.log("\n\n **** success callback of analyzer queue **** \n\n\n",result);
            res.json(result);
            elapsed_time("end total process()");

    });

    res.json({message: "Queued"});
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
router.put('/:oldprovider/:newprovider', function (req, res) {
    DRController.update(req, res);
});

/*
 * DELETE
 */
router.delete('/:id', function (req, res) {
    DRController.remove(req, res);
});

module.exports = router;

function IsJsonString(str) {
    try {
        str = JSON.parse(str);
    } catch (e) {
        return str;
    }
    return str;
}

var start = process.hrtime();

var elapsed_time = function(note){
    var precision = 3; // 3 decimal places
    var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
    console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
    start = process.hrtime(); // reset the timer
    return elapsed.toFixed(precision);
}