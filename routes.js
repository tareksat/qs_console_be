const { fetchSerialPorts, loadConfigurations, saveConfigurations, connectSerialPort, sendCommand } = require('./controller');

module.exports = (app) => {
    app.get('/api', (req, res) => res.send({ status: 200 }))
    app.get('/api/getPorts', fetchSerialPorts);
    app.get('/api/loadConf', loadConfigurations);
    app.post('/api/saveConf', saveConfigurations);
    app.get('/api/connectToSerial', connectSerialPort);
    app.post('/api/sendCommand/', sendCommand);
}