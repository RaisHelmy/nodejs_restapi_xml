var request = require('request');
const express = require("express");
const { create } = require('xmlbuilder2');
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
        const json_body = JSON.parse(body);
        const root = create({ version: '1.0' })
            .ele('rss', {'xmlns:georss': 'http://www.georss.org/georss'})
              .ele('channel')
                .ele('title').txt('GeoServer Feed').up()
                .ele('link').txt('http://localhost:8081/v1/georss').up()
                .ele('description').txt('GeoServer Feed').up()
                .ele('item')
                  .ele('name').txt(json_body["device_name"]).up()
                  .ele('lastUpdate').txt(json_body["timestamp"]).up()
                  .ele('georss:where')
                    .ele('gml:Point', {'xmlns:gml':'http://www.opengis.net/gml'})
                    .ele('gml:pos').txt(json_body["longitude"]+' '+json_body["latitude"]).up()
                    .up()
                  .up()
                .up()
              .up()
            .up();
            const xml_syafiq = root.end({ prettyPrint: true });
        console.log('Updated and served at port: '+xml_syafiq);
        app.get("/", (req, res, next) => {
          let data = xml_syafiq;
          res.header("Content-Type", "application/xml");
          res.status(200).send(data);
        });
    }
};

setInterval(function(){request(options, callback);},1000);

app.listen(6789, () => {
  console.log("Server is running on port 6789");
});
