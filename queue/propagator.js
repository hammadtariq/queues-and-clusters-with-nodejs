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

//process.env.UV_THREADPOOL_SIZE = 128;
const request = require('request')
const kue = require('kue');  
const cluster = require('cluster');
const job = kue.createQueue(redisConfig);  
const max_workers = require('os').cpus().length;
job.watchStuckJobs(6000);

function updateDRs(data, done) {  
  job.create('updateDRs', data)
    .priority('critical')
    .attempts(8)
    .backoff(true)
    .removeOnComplete(false)
    .on('enqueue', function(result){
      console.time("updateDR");
      console.log('updateDR job enqueue ');
    })
    .on('start', function(result){
      console.log('updateDR job start ');
    })
    .on('promotion', function(result){
      console.log('updateDR job promotion ',result);
    })
    .on('progress', function(result){
      console.log('updateDR job progress ',result);
    })
    .on('remove', function(result){
      console.log('updateDR job start ');
    })
    .on('complete', function(result){
      console.log('updateDR term job completed');
      console.timeEnd("updateDR");
      done(result)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('updateDR Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('updateDR Job failed with error: ',errorMessage);
      done(errorMessage);
    })
    .save(function (err) {
      if (err) {
        console.log("updateDR term job is not saved due to: ",err);
      }
        console.log("updateDR term job saved");
    });
}

function updateNames(data,done) {

    var updateNameQueue = jobs.create('updateNames',data)
    .on('enqueue', function(result){
      console.time("updateName");
      console.log('updateName job enqueue ');
    })
    .on('start', function(result){
      console.log('updateName job start ');
    })
    .on('promotion', function(result){
      console.log('updateName job promotion ',result);
    })
    .on('progress', function(result){
      console.log('updateName job progress ',result);
    })
    .on('remove', function(result){
      console.log('updateName job start ');
    })
    .on('complete', function(result){
      console.log('updateName term job completed');
      console.timeEnd("updateName");
      done(result)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('updateName Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('updateName Job failed with error: ',errorMessage);
      done(errorMessage);
    })
    .save(function (err) {
      if (err) {
        console.log("updateName term job is not saved due to: ",err);
      }
        console.log("updateName term job saved");
    });

}

function updateWorks(data, done) {  

  var updateWorksQueue = job.create('updateWorks', data)
    .on('enqueue', function(result){
      console.time("updateWorks");
      console.log('updateWorks job enqueue ');
    })
    .on('start', function(result){
      console.log('updateWorks job start ');
    })
    .on('promotion', function(result){
      console.log('updateWorks job promotion ',result);
    })
    .on('progress', function(result){
      console.log('updateWorks job progress ',result);
    })
    .on('remove', function(result){
      console.log('updateWorks job start ');
    })
    .on('complete', function(result){
      console.log('updateWorks term job completed');
      console.timeEnd("updateWorks");
      done(result)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('updateWorks Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('updateWorks Job failed with error: ',errorMessage);
      done(errorMessage);
    })
    .save(function (err) {
      if (err) {
        console.log("updateWorks term job is not saved due to: ",err);
      }
        console.log("updateWorks term job saved");
    });
}


function createJobs(data,done){
    updateDR(data, done);
    updateName(data, done);
    updateWorks(data, done);
}

if( cluster.isMaster ) {

    console.log("no of cores  -> ",max_workers);
    for (var i = 0; i < max_workers; i++) {
        cluster.fork();
        console.log("forked -> "+i);
    }
    Object.keys(cluster.workers).forEach(function(id) {
      console.log("process id's => ",cluster.workers[id].process.pid);
    });

    require('./workers/propagator_worker_manager')(queue, cluster);

  } else {
    console.log("Spawning worker");
    //require('./workers/analyzer_worker_manager')(queue);
  }

module.exports = {  
  propagator: (data, done) => {
    createJobs(data, done);
    //startProcesses();
  }
};    