const wtf = require('wtf_wikipedia');
const express = require('express');
const CronJob = require('cron').CronJob;
const fs = require('fs');
const filename = "/tmp/timestamp";

const getWikipediaInfo = () => {
  wtf.from_api('Johnny Hallyday', 'en', (markup) => {
    const response = wtf.parse(markup);

    try {
      const { infoboxes: [{ data }] } = response;
      const death = !!data.death_date;

      const jsonData = {
        "timestamp": Date.now(),
        "death": death
      };

      // set new file system
      try {
        fs.writeFileSync(filename, JSON.stringify(jsonData), function(err){
          if(err) {
            console.log(err);
          }
        });

        console.log('Last write file at ', new Date());
      } catch(err) {
        console.log(err);
      }

    } catch (err) {
      console.log(err);
    }
  });
};

// Define a cron job
// every 10 minutes he try to reach wikipedia page
// and when it succeed it will populate a timestamp file
const job = new CronJob({
  cronTime: '*/10 * * * *',
  onTick: function() {
    getWikipediaInfo();
  },
  start: true,
  timeZone: 'America/New_York',
  runOnInit: true,
});

const app = express();

app.get('/isjohnnydead', (req, res) => {

  // read cached file system
  fs.readFile(filename, 'utf8', function (err,data) {
  	const death = JSON.parse(data).death;
	  retrieveInfo = false;

	  res.json({
      isDead: death,
    });
  });
});

app.get('/lastupdate', (req, res) => {
  fs.readFile(filename, 'utf8', function (err,data) {
  	const timestamp = JSON.parse(data).timestamp;

	  res.json({
      lastUpdate: timestamp,
    });
  });
});

app.listen(4000, () => console.log('Johnny listening on port 4000!')); // eslint-disable-line
