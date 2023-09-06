const repl = require('repl');

// Propagating the function to the global object explicitly so that it's available in REPL
getRandomNumber = function getRandomNumber() {
    return Math.random();
}

repl.start();
