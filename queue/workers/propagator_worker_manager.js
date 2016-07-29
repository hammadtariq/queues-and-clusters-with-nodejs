'use strict';

const request = require('request')

module.exports = function(queue, cluster) {

    require('./../processes/propagatorProcesses/updateDRs')(queue, cluster, request);

    require('./../processes/propagatorProcesses/updateNames')(queue, cluster, request);

    require('./../processes/propagatorProcesses/updateWorks')(queue, cluster, request);

};