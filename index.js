const request = require('request');

exports.getLatest = (req, res) => {
  let username = 'tristansokol';
  request('https://medium.com/@' + username + '/latest?format=json', function(error, response, body) {
    if (error || response.statusCode != 200) {
      console.error(response);
      console.error(error);
    }
    res.send(JSON.parse(body.substring(16)));
  });
};
