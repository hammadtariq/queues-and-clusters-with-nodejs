'use strict';

module.exports = function(queue, cluster, request) {

    // Process up to 10 jobs concurrently
    queue.process('searchTermInDRs', function(jobs, done){  

        const localuri = "http://localhost:3000/dr/"+jobs.data;

        request({
                uri: localuri,
                method: "get",
                // timeout: 10000,
                // followRedirect: true,
                // maxRedirects: 10
            }, function(error, response, body) {
            if(!error){
                done(null,body);
            }else{
                done({status:false, error:error.message});
            }
        });
        
    });    

};