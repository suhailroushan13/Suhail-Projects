import {parentPort} from "worker_threads"

// listen for messages from the main thread
parentPort.on('message', (msg) => {
  console.log(`Message from main thread: ${msg}`);
  
  // send a message back to the main thread
  parentPort.postMessage('Hello from worker thread');
});
