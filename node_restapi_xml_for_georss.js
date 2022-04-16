var request = require('request');
const express = require("express");
const app = express();

var headers = {
    'x-api-key': '5ImHVWTLdpx'
};

var options = {
    url: 'http://121.121.90.133:8081/poc/v1/coordinate',
    headers: headers
};

function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log(body);
        app.get("/", (req, res, next) => {
          let data = body;
          res.header("Content-Type", "application/xml");
          res.status(200).send(data);
        });
    }
};

setInterval(function(){request(options, callback);},1000);

app.listen(6789, () => {
  console.log("Server is running on port 6789");
});
