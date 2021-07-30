const {
    getSerialPorts,
    saveConfig,
    loadConfig, port,
    connectToSerialPort,
    sendSerialCommand } = require('./utils');

const fetchSerialPorts = async (req, res) => {
    const ports = await getSerialPorts();
    res.send(ports);
}

const loadConfigurations = async (req, res) => {
    const config = await loadConfig();
    res.send(config);
}

const saveConfigurations = async (req, res) => {
    const { desk, category, comPort, server } = req.body;
    saveConfig({ desk, category, comPort, server });
    res.send('OK')
}

const connectSerialPort = async (req, res) => {
    const baudRate = parseInt(process.env.BAUDRATE);
    const config = await loadConfig();

    const isConnected = await connectToSerialPort(config.comPort, baudRate);
    if (isConnected === 'connected') return res.send({ status: 200 });

    res.send({ status: 500 });

}

const sendCommand = async (req, res) => {
    const { type, num } = req.body;
    console.log({ type, num })
    sendSerialCommand(type, num);
    res.send('OK')
}

module.exports = {
    fetchSerialPorts,
    loadConfigurations,
    saveConfigurations,
    connectSerialPort,
    sendCommand
}