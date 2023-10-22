const repl = require('repl');
const fs = require('fs');

EventEmitter = class EventEmitter {
    listeners = {};  // key-value pair

    addListener(eventName, fn) {
        if (this.listeners[eventName]) {
            this.listeners[eventName].push(fn);
        } else {
            this.listeners[eventName] = [fn];
        }
    }

    on(eventName, fn) {
        this.addListener(eventName, fn);
    }

    removeListener(eventName, fn) {
        const fnIndex = this.listeners[eventName]?.indexOf(fn);
        this.listeners[eventName]?.splice(fnIndex, 1);
    }

    off(eventName, fn) {
        this.removeListener(eventName, fn);
    }

    once(eventName, fn) {
        fn.isOnce = true;
        this.addListener(eventName, fn);
    }

    emit(eventName, ...args) {
        if (this.lastEvent === eventName) {
            return;
        }
        this.lastEvent = eventName;
        this.listeners[eventName]?.forEach((fn) => fn(...args));
        this.listeners[eventName].filter((fn) => !fn.isOnce);
    }

    listenerCount(eventName) {
        return this.listeners[eventName]?.length || 0;
    }

    rawListeners(eventName) {
        return this.listeners[eventName] || [];
    }
}

WithTime = class WithTime extends EventEmitter {
    execute(asyncFunc, ...args) {
        const startTime = new Date();

        this.emit('begin');
        asyncFunc(...args).finally(() => {
            this.emit('end');
            console.log('execute finished after', new Date() - startTime, 'ms');
        });
    }
}


csvToJson = function CSVtoJSON() {
    const csvFilePath = './csvdirectory/csv.csv';
    const csv = require('csvtojson');

    csv().fromFile(csvFilePath).then((json) => {
        const stringsArr = json.map((obj) => JSON.stringify(obj) + '\n')
        fs.appendFile('./csvdirectory/csv.txt', stringsArr.join(''), (err) => {
            if (err) console.error(err);
        });
    })
}


repl.start();
