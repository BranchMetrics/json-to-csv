const express = require("express");
const router = express.Router();
var request = require('request');
var q = require("q");
var fs = require('fs')
var json2csv = require('json2csv').parse;
var input = require('input.json');

module.exports = router;

getCSV().then(function(results){
  var csv = json2csv(results);
  fs.writeFile('output.csv', csv, function(err) {
    if (err) throw err;
    console.log('file saved');
  });

})

function getCSV(){
  var d = q.defer();
  var newArray = [];
  var count = 0;
  input[0].postbacks.map(function(x){
    if(count == input[0].postbacks.length - 1){
      d.resolve(newArray)
    }
    var e = {"event":x.event, "webhook2_id":x.webhook2_id, "filter":x.filter, "enabled":x.enabled, "datasource":x.datasource,"unique":x.unique, "payload_data":JSON.stringify(x.payload_data), "schema_version":x.schema_version};
    // console.log(e)
    newArray.push(e);
    count = count + 1;
  });
  return d.promise;
}
