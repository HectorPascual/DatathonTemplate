var fs =  require('fs');

var csv = require('fast-csv');

var stream = fs.createReadStream("sacramento.csv");
 
var csvStream = csv()
    .on("data", function(data){
         console.log(data);
    })
    .on("end", function(){
         console.log("done");
    });
 
stream.pipe(csvStream);
 