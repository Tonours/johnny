const wtf = require('wtf_wikipedia');
const express = require('express');
const fs = require('fs');
const filename = __dirname + "/timestamp";
const timeRange = 1000*60*10; // 10 minutes

const app = express();

app.get('/isjohnnydead', (req, res) => {

  // read cached file system
  fs.readFile(filename, 'utf8', function (err,data) {

    var retrieveInfo = true;
  	if(err || !data) fs.openSync(filename, 'w');
    else if(Date.now() - JSON.parse(data).timestamp < timeRange) {

	  const death = JSON.parse(data).death;
	  retrieveInfo = false;

	  res.json({
   		isDead: death,
      });
	}

   // retrieve data from wiki
  if(retrieveInfo) {

	wtf.from_api('Johnny Hallyday', 'en', (markup) => {
      const response = wtf.parse(markup);
	  const { infoboxes: [{ data }] } = response;
      const death = !!data.death_date;

	  const jsonData = {
	    "timestamp": Date.now(),
		"death": death
	  };

	  // set new file system
	  fs.writeFileSync(filename, JSON.stringify(jsonData), function(err){
	    if(err) console.log(err);
	  });
	  
      res.json({
   	    isDead: death,
      });

    });
  } 
  
 });

});

app.listen(4000, () => console.log('Johnny listening on port 4000!')); // eslint-disable-line
