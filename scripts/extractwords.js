// Assuming you place several english wordlist sources into
// ../resources, this simple script will extract, unique, and
// combine them all, cleaning up punctuation and downcasing.

var path = require('path'),
    fs = require('fs');

var resPath = path.join(__dirname, "..", "resources");

fs.readdir(resPath, function(err, files) {
  var finished = 0;
  var uniq = { };
  files.forEach(function(filename) {
    if (/^\./.test(filename) || /~$/.test(filename)) {
      ++finished;
      return;
    }
    fs.readFile(path.join(resPath, filename), function(err, chunk) {
      chunk.toString().split(/\s+/).forEach(function(word) {
        word = word.replace(/[^A-Za-z]+/g, '');
        if (word.length > 0) uniq[word.toLowerCase()] = true;
      });
      if (++finished === files.length) {
        console.log(Object.keys(uniq).sort().join('\n'));
      }
    });
  });
});
