
'use strict';

let start = process.hrtime();

module.exports = {

    /**
     * util.isJsonString()
     */
    
    isJsonString: function isJsonString(str) {
            try {
                str = JSON.parse(str);
            } catch (e) {
                return str;
            }
            return str;
        },

    /**
     * util.elapsed_time()
     */

    elapsed_time : function elapsed_time(note){
            var precision = 3; // 3 decimal places
            var elapsed = process.hrtime(start)[1] / 1000000; // divide by a million to get nano to milli
            console.log(process.hrtime(start)[0] + " s, " + elapsed.toFixed(precision) + " ms - " + note); // print message + time
            start = process.hrtime(); // reset the timer
            return elapsed.toFixed(precision);
        }
}