// Requirements
var express = require("express");
var csv = require("csv");
var fs = require("fs");
var url = require('url');
// Launch application and server
var app = express();
var server = app.listen(3000, function() {
    console.log("Server listening at port %d", server.address().port);
    
});
// Init 
var tableArray = [];
readCsv(__dirname + '/authorSign.csv');
// Routes
app.get('/az', function(req, res) {
    var parsedUrl = url.parse(req.url, true);
    var queryObj = parsedUrl.query;
    if (queryObj.surname) {
    	var answer = findAZbySurname(queryObj.surname.toLowerCase());
    	if (answer) {
    		res.send('{"surname":"'+queryObj.surname.toLowerCase()+'", "az": "'+answer+'" }');
    	} else {
    		res.send('{"error":"invalid type of surname"}');
    	}
	} else {
    	res.send('{"error":"no surname in request"}');
	}
});

// Search for matches
function findAZbySurname(surname) {
	var startTime = Date.now();
    function findLongest(str) {
    	var result = 0;
    	var resultWord = "";
    	var resultLength = 0;
        for (var j=0; j < tableArray[0].length; j++) {
        	var checkWord = tableArray[0][j][1];
        	var checkLength = checkWord.length;
            if (checkLength > resultLength && checkLength < str.length) {
            	if (str.substring(0,checkLength) == checkWord) {
            		result = tableArray[0][j][0];
            		resultWord = checkWord;
            		resultLength = checkLength;
            	}
            }
        }
		return result;
    }

    if (surname !== "undefined") {
    	result = findLongest(surname);
    } else {
    	result = false;
    }
    var endTime = (Date.now() - startTime)/1000;
    //console.log('Time spent on resolving request <'+surname+'> in seconds: ' + endTime);
    return result;
}
// Database preparing
function readCsv(csvFile) {
	var startTime = Date.now();
    csv()
    .from.stream(fs.createReadStream(csvFile))
    .to.array( function(data){
        tableArray.push(data);
    })
    .on('end', function(count){
        console.log('Database processed into array. Number of lines: '+count);
        var endTime = (Date.now() - startTime)/1000;
        //console.log('Time spent on database processing in seconds: ' + endTime);
    })
    .on('error', function(error){
      console.log("ERROR "+error.message);
    });
}