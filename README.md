# nsq-node-example
two nodejs server using nsq 

## How to start?
  - Make sure to run `npm install` or `npm i`
  - Make sure NSQ is installed
    - if you're using mac go to `node_modules/nsqueue` and run `make download-osx`
    - if you're using linux go to `node_modules/nsqueue` and run `make download-linux`
  - How to run it
    - go to  `node_modules/nsqueue` and run `make test`
  - Run the two server `npm start`

## What to expect
  - On `GET` request to two of the server `http://localhost:9999/` or `http://localhost:9998/` you'll see what's on the queue
  - On `POST` request to two of the server `http://localhost:9999/` or `http://localhost:9998/` you'll publish to the queue

