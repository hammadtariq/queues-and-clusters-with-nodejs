'use strict';

const request = require('request')

module.exports = function(queue, cluster) {

    require('./../processes/analyzerProcesses/validateTerm')(queue, cluster, request);

    require('./../processes/analyzerProcesses/searchTermInDRs')(queue, cluster, request);

    require('./../processes/analyzerProcesses/searchTermInWorks')(queue, cluster, request);

    require('./../processes/analyzerProcesses/searchTermInNames')(queue, cluster, request);


    // queue.process("calculatefactorial", function(j, done) {
    //     done(null, j.data.num * 100);
    // });

    // queue.process("printfactorial", 10, function(j, done) {
    //     setTimeout(function() {
    //         console.log("Factorial: " + j.data);
    //         done(null,j.data);
    //     }, 2000);
    // });


};