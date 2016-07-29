
'use strict';

module.exports = function(queue, cluster, request) {

    queue.process('validateTerm', 20, function(job, done){  

        console.log('validateTerm', job.id, 'is done');
        done && done(null,job.data);

    }); 
    
};