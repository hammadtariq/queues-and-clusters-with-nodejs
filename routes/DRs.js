'use strict';

var express = require('express');
var router = express.Router();
var DRController = require('../controllers/DRController.js');
var analyzerQueue = require('../queue/analyzer.js');
var propagatorQueue = require('../queue/propagator.js');
const util = require('./../js/util.js')

/*
 * GET
 */
router.get('/', function (req, res) {
    //DRController.list(req, res);

    util.elapsed_time("start total process()");
    let reqObj = {term:"farhan", editedTerm:"hammad"}
    analyzerQueue.analyze(reqObj,(result)=>{
        let resultObj = {termObj:reqObj, analyzerResult:result};
        console.log("\n\n **** success callback of analyzer queue **** \n\n\n",result);
        propagatorQueue.propagator(resultObj,(response)=>{
            console.log("response from propagator queue => ",response);
            util.elapsed_time("end total process()");
        })
        //res.json(result);

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