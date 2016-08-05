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
const queue = kue.createQueue(redisConfig);  
const max_workers = require('os').cpus().length;
const util = require('./../js/util.js')
queue.watchStuckJobs(6000);

let analyzerQueueLogs = []


function validateTerm(data,done) {
    var validateQueue = queue.create('validateTerm',data)
    .on('enqueue', function(result){
      //elapsed_time("start validateTerm()");
      //console.time("validateTerm");
      console.log('validateTerm job enqueue ');
    })
    .on('start', function(result){
      console.log('validateTerm job start ');
    })
    .on('promotion', function(result){
      console.log('validateTerm job promotion ',result);
    })
    .on('progress', function(result){
      console.log('validateTerm job progress ',result);
    })
    .on('remove', function(result){
      console.log('validateTerm job start ');
    })
    .on('complete', function(result){
      console.log('validateTerm job completed');
      let time = util.elapsed_time("end validateTerm()")+" ms";
      //console.timeEnd("validateTerm");
      analyzerQueueLogs.push({process:"validateTerm",timeTaken:time, status:'completed', result:result});
      searchTermInDRs(result,done);
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('validateTerm Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('validateTerm Job failed with error: ',errorMessage);
      done(errorMessage);
    })
    .save(function (err) {
      if (err) {
        console.log("validateTerm job is not saved due to: ",err);
      }
        console.log("validateTerm job saved");
    });

}

function searchTermInDRs(data, done) {  

  var searchQueue = queue.create('searchTermInDRs', data)
    .on('enqueue', function(result){
      //elapsed_time("start searchTermInDRs()");
      //console.time("searchTermInDRs");
      console.log('searchTermInDRs job enqueue ');
    })
    .on('start', function(result){
      console.log('searchTermInDRs job start ');
    })
    .on('promotion', function(result){
      console.log('searchTermInDRs job promotion ',result);
    })
    .on('progress', function(result){
      console.log('searchTermInDRs job progress ',result);
    })
    .on('remove', function(result){
      console.log('searchTermInDRs job start ');
    })
    .on('complete', function(result){
      console.log('searchTermInDRs term job completed');
      const time = util.elapsed_time("end searchTermInDRs()")+" ms";
      //console.timeEnd("searchTermInDRs");
      console.info("search result of DR db -> ",result);
      result = util.isJsonString(result)
      analyzerQueueLogs.push({process:"searchTermInDRs",timeTaken:time, status:'completed', result:result});
      searchTermInWorks(data, done);
      //done(result)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('search Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('search Job failed with error: ',errorMessage);
      const time = util.elapsed_time("end searchTermInDRs()")+" ms";
      console.info("search result of DR db -> ",errorMessage);
      result = util.isJsonString(errorMessage)
      analyzerQueueLogs.push({process:"searchTermInDRs",timeTaken:time, status:'failed', result:errorMessage});
      searchTermInWorks(data, done);
    })
    .save(function (err) {
      if (err) {
        console.log("search term job is not saved due to: ",err);
      }
        console.log("search term job saved");
    });
}



function searchTermInWorks(data, done) {  

  var searchQueue = queue.create('searchTermInWorks', data)
    .on('enqueue', function(result){
      //elapsed_time("start searchTermInWorks()");
      //console.time("searchTermInWorks");
      console.log('searchTermInWorks job enqueue ');
    })
    .on('start', function(result){
      console.log('searchTermInWorks job start ');
    })
    .on('promotion', function(result){
      console.log('searchTermInWorks job promotion ',result);
    })
    .on('progress', function(result){
      console.log('searchTermInWorks job progress ',result);
    })
    .on('remove', function(result){
      console.log('searchTermInWorks job start ');
    })
    .on('complete', function(result){
      console.log('searchTermInWorks job completed');
      const time = util.elapsed_time("end searchTermInWorks()")+" ms";
      //console.timeEnd("searchTermInWorks");
      console.info("search result of Work db -> ",result);
      result = util.isJsonString(result)
      analyzerQueueLogs.push({process:"searchTermInWorks",timeTaken:time, status:'completed', result:result});
      searchTermInNames(data, done);
      //done(result)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('searchTermInWorks Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('searchTermInWorks Job failed with error: ',errorMessage);
      //done(errorMessage);
      const time = util.elapsed_time("end searchTermInWorks()")+" ms";
      console.info("search result of Work db -> ",errorMessage);
      result = util.isJsonString(errorMessage)
      analyzerQueueLogs.push({process:"searchTermInWorks", timeTaken:time, status:'failed', result:errorMessage});
      searchTermInNames(data, done);
    })
    .save(function (err) {
      if (err) {
        console.log("searchTermInWorks job is not saved due to: ",err);
      }
        console.log("searchTermInWorks job saved");
    });
}

function searchTermInNames(data, done) {  

  var searchTermInNames = queue.create('searchTermInNames', data)
    .on('enqueue', function(result){
      //elapsed_time("start searchTermInNames()");
      //console.time("searchTermInNames");
      console.log('searchTermInNames job enqueue ');
    })
    .on('start', function(result){
      console.log('searchTermInNames job start ');
    })
    .on('promotion', function(result){
      console.log('searchTermInNames job promotion ',result);
    })
    .on('progress', function(result){
      console.log('searchTermInNames job progress ',result);
    })
    .on('remove', function(result){
      console.log('searchTermInNames job start ');
    })
    .on('complete', function(result){
      console.log('searchTermInNames job completed');
      const time = util.elapsed_time("end searchTermInNames()")+" ms";
      //console.timeEnd("searchTermInNames");
      result = util.isJsonString(result)
      analyzerQueueLogs.push({process:"searchTermInNames", timeTaken:time, status:'completed', result:result});
      console.info("search result of Name db -> ",result);
      done(analyzerQueueLogs)
     })
    .on('failed attempt', function(errorMessage, doneAttempts){
      console.log('searchTermInNames Job failed with attempts: ',doneAttempts);
     })
    .on('failed', function(errorMessage){
      console.log('searchTermInNames Job failed with error: ',errorMessage);
      const time = util.elapsed_time("end searchTermInNames()")+" ms";
      result = util.isJsonString(errorMessage)
      analyzerQueueLogs.push({process:"searchTermInNames",timeTaken:time, status:'failed', result:errorMessage});
      console.info("search result of Name db -> ",errorMessage);
      done(errorMessage);
    })
    .save(function (err) {
      if (err) {
        console.log("searchTermInNames job is not saved due to: ",err);
      }
        console.log("searchTermInNames job saved");
    });
}

// function calculateFactorial(){
      
//     for(var i = 0; i < 100; i++) {
//         console.log("job: " + i);
//         queue.create('calculatefactorial', {num: i})
//         .save(function (err) {
//           if (!err) {
//             console.log("factorail job saved ");
//           }
//         });;
//     }
// }

// function printFactorial(result){
//     queue.create('printfactorial', result)
//       .save(function (err) {
//         if (!err) {
//           console.log("print factorail job saved ");
//         }
//       });
// }

function createJobs(data,done){
    validateTerm(data, done);
    //searchTermInNames(data, done);
    //searchTermInWorks(data, done);
    //updateTerm(data, done);
    //calculateFactorial();
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

      require('./workers/analyzer_worker_manager')(queue, cluster);

  } else {
    console.log("Spawning worker from queue/analyzer.js ");
    //Error: bind EADDRINUSE null:3000
  }


module.exports = {  
  analyze: (data,done) => {
     createJobs(data,done);
     //require('./workers/analyzer_worker_manager')(queue, cluster);
  }
};
