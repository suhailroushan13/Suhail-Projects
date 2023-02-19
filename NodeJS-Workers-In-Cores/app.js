import { Worker }  from "worker_threads"

// create a new worker thread
const worker = new Worker('./worker.js');

// listen for messages from the worker thread
worker.on('message', (msg) => {
  console.log(`Message from worker: ${msg}`);
});

// send a message to the worker thread
worker.postMessage('Hello from main thread');
