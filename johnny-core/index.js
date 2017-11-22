const wtf = require('wtf_wikipedia');
const express = require('express');

const app = express();

app.get('/isjohnnydead', (req, res) => {
  wtf.from_api('Johnny Hallyday', 'en', (markup) => {
    const response = wtf.parse(markup);
    const { infoboxes: [{ data }] } = response;
    const death = !!data.death_date;

    res.json({
      isDead: death,
    });
  });
});

app.listen(4000, () => console.log('Johnny listening on port 4000!')); // eslint-disable-line
