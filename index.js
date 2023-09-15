const repl = require('repl');
const exec = require('child_process').exec;
const os = require('os');
const fs = require('fs');

const MACOS = 'ps -A -o %cpu,%mem,comm | sort -nr | head -n 1';
const WINDOWS = 'powershell "Get-Process | Sort-Object CPU -Descending | Select-Object -Property Name, CPU, WorkingSet -First 1 | ForEach-Object { $_.Name + \' \' + $_.CPU + \' \' + $_.WorkingSet }"';

// Propagating the function to the global object explicitly so that it's available in REPL
getRandomNumber = function getRandomNumber() {
    return Math.random();
}

logMostIntenseProcesses = function logMostIntenseProcesses() {
    const bufferArr = [];
    setInterval(() => {
        exec(os.platform() === 'win32' ? WINDOWS : MACOS,
        function (error, stdout) {
            process.stdout.clearLine(1) // from cursor to end
            process.stdout.write(stdout);
            process.stdout.moveCursor(0, -1) // up one line
            bufferArr.push(new Date().getTime() + ' : ' + stdout);
            if (error !== null) {
                console.log('exec error: ' + error);
            }
        });
    }, 100);

    setInterval(() => {
        fs.appendFile('activityMonitor.log', bufferArr.join(''), (err) => {
            if (err) throw err;
        });
    }, 60000);
}

repl.start();

