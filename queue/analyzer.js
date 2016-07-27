'use strict';

let redisConfig;  
if (process.env.NODE_ENV === 'production') {  
  redisConfig = {
    redis: {
      port: process.env.REDIS_PORT,
      host: process.env.REDIS_HOST,
      auth: process.env.REDIS_PASS,
      options: {
        no_ready_check: false
      }
    }
  };
} else {
  redisConfig = {};
}


const kue = require('kue');  
const cluster = require('cluster');
//const job = kue.createQueue();
const job = kue.createQueue(redisConfig);  

job.watchStuckJobs(1000 * 10);
const max_workers     = 3;

job.on('ready', () => {  
  console.info('job is ready!');
});

job.on('error', (err) => {  
  console.error('There was an error in the main queue!');
  console.error(err);
  console.error(err.stack);
});


function searchTerm(data, done) {  
  job.create('searchTerm', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .on('complete', function (){
        console.log('Job', job.id, 'with name', job.data.name, 'is    done');
    })
    .on('failed', function (){
        console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
    }).save(err => {
      if (err) {
        console.error(err);
        done(err);
      }
      if (!err) {
        done();
      }
    });
}

function validateTerm(data,done) {

    var job = jobs.create('validateTerm',data)
    .on('complete', function (){
        console.log('Job', job.id, 'with name', job.data.name, 'is    done');
    })
    .on('failed', function (){
        console.log('Job', job.id, 'with name', job.data.name, 'has  failed');
    })
    .save( function(err){
        if( !err){} console.log( "no error");
    });

}

function startProcesses() {

    if( cluster.isMaster ) {

        for (var i = 0; i < max_workers; i++) {
            cluster.fork();
            console.log("forked -> "+i);
        }

    } else {

        // Process up to 20 jobs concurrently
        queue.process('searchTerm', 20, function(job, done){  

            console.log('Job', job.id, 'is done');
            // Call done when finished
            done && done();;
        });    

        // Process up to 20 jobs concurrently
        // queue.process('validateTerm', 20, function(job, done){  

            // console.log('Job', job.id, 'is done');
            // // Call done when finished
            // done && done();;
        // });    

    }    

}



module.exports = {  
  propagator: (data, done) => {
    searchTerm(data, done);
    startProcesses();
  }
};    