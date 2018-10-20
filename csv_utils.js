const readline = require('readline');
const fs = require('fs');


function read_file(file){

    var arr = [];

    const rl = readline.createInterface({
        input: fs.createReadStream(file),
        crlfDelay: Infinity
        });
    
    rl.on('line', (line) => {
        //console.log(`Line from file: ${line}`);
        arr.push(line);
    }).on("close", function(){
        console.log('file read: ', file);
    });

    var end = new Promise(function(resolve, reject) {
        rl.on('close', ()=>resolve(arr));
        rl.on('error', reject); // or something like that
    });

    return end;
}

function calculateError(arrayA, arrayB){
    var x = 0; 
    
    for(i=0;i<arrayA.length;i++){
        if(arrayB[i]==arrayA[i]){
            x = x+1;
        }
    }
    console.log(x + '/' + arrayA.length);
}

function calculateErrorMetric(arrayA, arrayB, metric){
    var x = 0; 
    
    for(i=0;i<arrayA.length;i++){
        console.log(arrayB[i], arrayA[i]);
        x = Math.pow((arrayB[i]-arrayA[i]),2) + x;
    }
    console.log('MSE: ', x);
}

async function execute() {
    let array_good = await read_file('sample.csv');
    let array_check = await read_file('sample2.csv');

    //console.log(array_good);
    //console.log(array_check);
    //console.log("reading finished");
 
    calculateErrorMetric(array_good, array_check, 'MSE');
}

execute();