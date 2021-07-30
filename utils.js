const SerialPort = require("serialport");
const fs = require('fs');
const util = require('util');
const path = require('path')

const readFile = util.promisify(fs.readFile)
const writeFile = util.promisify(fs.writeFile);

const getSerialPorts = async () => {
    const list = await SerialPort.list();
    console.log(list)
    const ports = list.map(p => p.path);
    return ports
}

const saveConfig = async (config) => {
    await writeFile('./config.json', JSON.stringify(config));
}

const loadConfig = async () => {
    const buff = await readFile('./config.json');
    obj = JSON.parse(buff);
    return obj
}

let port;

const connectToSerialPort = async (comPort, baudRate) => {
    return new Promise(async (resolve, reject) => {
        if (port) {
            try {
                await closeSerialPort();
            } catch (e) { resolve('error') }
        }
        port = new SerialPort(comPort, {
            baudRate,
            autoOpen: true
        }, function (err, _) {
            if (err) {
                resolve('error')
            }
            port.on("data", (data) => { console.log('Serial', data.toString()) })
            resolve('connected')
        });
    })
}

const closeSerialPort = () => {
    return new Promise((resolve, reject) => {
        port.close(function (err) {
            if (err) {
                reject('error')
            }
            resolve('OK')
        });
    });
}

const sendSerialCommand = async (type, command) => {
    if (type === 'ON') command = process.env.ON_COMMAND
    if (!command) return

    port.write(`${command}\r\n`, function (err) {
        if (err) {
            return console.log('Error on write: ', err.message)
        }
        console.log('message written')
    });
    return
}

module.exports = {
    getSerialPorts,
    saveConfig,
    loadConfig,
    port,
    connectToSerialPort,
    sendSerialCommand
}