var request = require('request');
var fs      = require('fs');

var appRoot = 'app';

var countriesUrl  = 'https://raw.githubusercontent.com/fightforthefuture/fightforthefuture.github.io/production/site/_data/countries.yml';
var petitionUrl   = 'https://raw.githubusercontent.com/fightforthefuture/fightforthefuture.github.io/production/site/_includes/petition.html';
var javascriptUrl = 'https://raw.githubusercontent.com/fightforthefuture/fightforthefuture.github.io/production/js/components/petitions.js';

request(petitionUrl, function(err, httpResponse, body) {
  if (err || httpResponse.statusCode != 200) {
    console.log('COULD NOT DOWNLOAD petition.html FROM GITHUB LOL:', body);
    process.exit(1);
  }
  fs.writeFile(appRoot + '/_includes/petition.html', body, function(err) {
      if(err) {
          console.log('FILE SAVE FAILURE: ', console.log(err));
          process.exit(1);
      }
      request(javascriptUrl, function(err, httpResponse, body) {
          if (err || httpResponse.statusCode != 200) {
            console.log('COULD NOT DOWNLOAD petitions.js FROM GITHUB LOL:', body);
            process.exit(1);
          }
          fs.writeFile(appRoot + '/_js/components/petitions.js', body, function(err) {
            if(err) {
                console.log('FILE SAVE FAILURE: ', console.log(err));
                process.exit(1);
            }
            request(countriesUrl, function(err, httpResponse, body) {
              if(err) {
                console.log('COULD NOT DOWNLOAD countries.yml FROM GITHUB LOL:', body);
                process.exit(1);
              }
              fs.writeFile(appRoot + '/_data/countries.yml', body, function(err) {
                console.log('Synced petitions code from fightforthefuture.github.io!');
                process.exit(0);
              });
            });
          });
      });
  });

});
