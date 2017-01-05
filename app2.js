const http = require('http');
const net = require('net');
const url = require('url');
const nsqueue = require('nsqueue');

const client = new nsqueue.Client({
  host: 'localhost',
  port: 4150
});

const PORT = 9998;
const TOPIC = 'topic';
const CHANNEL = 'channel';

const handleRequest = (request, response) => {
  if (request.method.toString().toLowerCase() === 'get') {
    client.on('message', function(msg) {
      console.log(msg.data.toString());
      response.end(msg.data.toString());
      msg.finish();
    })

    client.on('error', function(err) {
      console.error(err);
    })
    
  } else if (request.method.toString().toLowerCase() === 'post') {
    var body = '';
    request.on('data', function(data) {
        body += data;
    });
    request.on('end', function() {
      client.publish(TOPIC, JSON.stringify(body));
      response.end('Publish');
    });
  } else {
    response.end('Unsportted method' + request.url);
  }
}

const server = http.createServer(handleRequest);
server.listen(PORT, (error) => {
  if (error) {
    throw error;
  }
  client.connect((err) => {
    if (err) {
      throw err;
    }
    client.subscribe(TOPIC, CHANNEL, function(err) {
      if (err) {
        throw err;
      }
      console.log(`subscribe to topic ${TOPIC}, channel: ${CHANNEL}`);
    });
    console.log('connect to NSQ successfully');
  });
  console.log(`Sever listening on http://localhost:${PORT}`);
});
