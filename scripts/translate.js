// Given a google translation key in the environment, and
// a wordlist in ../wordlist.txt, use the google translation
// engine to translate into all available languages.
//
// (careful dude, running this with a GOOG api key costs you about 40$)

var googleTranslate = require('google-translate')(process.env.GOOGLE_API_KEY),
    path = require('path'),
    fs = require('fs');

var resPath = path.join(__dirname, '..', 'share');

var errors = [];

function writeLanguageFile(code, words) {
  fs.stat(resPath, function(err, stats) {
    if (!stats.isDirectory()) {
      fs.mkdirSync(resPath);
    }

    var p = path.join(resPath, code + ".txt");
    fs.writeFile(p, words.join('\n'),
                 function(err) {
                   if (err) {
                     console.error("error writing", p, "-", err);
                   }
                 });
  });
}

googleTranslate.getSupportedLanguages(function(err, languageCodes) {
  fs.readFile(path.join(__dirname, '..', 'wordlist.txt'), function(err, words) {
    words = words.toString().split('\n').filter(function(s) { return s.length > 0; });
    writeLanguageFile('en', words);
    function next() {
      if (languageCodes.length === 0) return;
      code = languageCodes.shift();
      if ('en' == code) return next();
      googleTranslate.translate(words, 'en', code, function(err, translations) {
        if (err) {
          console.error("error translating", code, "-", err);
          return;
        }
        var list = [];
        translations.forEach(function(x) {
          // skip zero length translations,
          // translations which are identical to source text
          // and translations with spaces.
          if (x.translatedText.length > 0 &&
              x.translatedText != x.originalText &&
              x.translatedText.indexOf(' ') === -1) {
            list.push(x.translatedText);
          }
        });
        writeLanguageFile(code, list);
        console.log(code, "complete");
        setTimeout(next, 1000);
      });
    }
    next();
  });
});
