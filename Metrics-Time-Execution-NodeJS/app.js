import { performance, PerformanceObserver } from "perf_hooks";
import readlineSync from 'readline-sync'

let input = readlineSync.questionInt("Enter a Number: ")
let metrics = {}

const range = () => {
  for(let i=1; i<=input; i++)
  console.log(i)
 }

const wrapped = performance.timerify(range);
const obs = new PerformanceObserver((list) => {
metrics.time = (list.getEntries()[0].duration/1000).toFixed(6);
console.log(metrics)  
  //performance.clearMarks();
  //performance.clearMeasures();
  obs.disconnect();
});
obs.observe({ entryTypes: ['function'] });

console.log(`Printing Numbers from 1-${input}`)
wrapped();
metrics.memory = `${Math.floor(process.memoryUsage().heapUsed / 1024)}`;
