
'use strict';

module.exports = function(queue, cluster, request) {

    queue.process('updateDRs',20, function(job, done){  
        var data = JSON.parse(job.data)         
        if(data.status && data.count > 0){
            request({
                uri: "http://localhost:3000/dr/anas/ahsan",
                method: "put",
                // timeout: 10000,
                // followRedirect: true,
                // maxRedirects: 10
            }, function(error, response, body) {
                if(!error){
                    done(null, body);
                }else{
                    done({status:false,error:error.message});
                }
            });
        }else{
            done("no match found to update");
        }
        
    });
    
};