
'use strict';

module.exports = function(queue, cluster, request) {

    queue.process('updateDRs',20, function(job, done){
        let termObj = job.data.termObj;
        let data = job.data.analyzerResult.filter((d)=>d.result.db == "dr")
        data = data[0].result;   
        const localuri = "http://localhost:3000/dr/"+termObj.term+"/"+termObj.editedTerm;      
        if(data.status && data.count > 0){
            request({
                uri: localuri,
                method: "put",
                // timeout: 10000,
                // followRedirect: true,
                // maxRedirects: 10
            }, function(error, response, body) {
                if(!error){
                    done(null, body);
                }else{
                    done(body);
                }
            });
        }else{
            done(null,"no match found in names db to update");
        }
        
    });
    
};