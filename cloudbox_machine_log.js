var SerialPort = require("serialport");
var log = require('./k_log');
// var PortName = null;
var Baudrate = 115200;
log.config({
	level: 2,
	level_config: [
		{ savetofile: true, print: false },
		{ savetofile: true, print: false }
	]
});
log.push(0, 'service:start');
var timer = new Timer(function () {
	timer.stop();
	scanPort(function (port) {
		// console.log(port);
		if (!isNull(port)) {
		log.push(0, 'Portname:',port);

			var serialport = new SerialPort(port, {
				baudrate: Baudrate,
				//autoOpen:true,
				parser: SerialPort.parsers.readline("\n")
			});

			serialport.on("open", function () {
				// console.log('open');
				log.push(0, 'Port:open');
				serialport.on('data', function (data) {
					//console.log(data);
					log.push(1, data);
					// console.log(array2string(JSON.parse(JSON.stringify(data)).data));

				});
			});
			serialport.on('error', function (err) {
				// console.log('Error: ', err.message);
				log.push(0, 'Port:error', err.message);
				timer.start();
			});
			serialport.on('close', function () {
				// console.log('Close');
				log.push(0, 'Port:close');
				timer.start();
			});

		} else {
			timer.start();
		}
	});

}, 1000);


function scanPort(callback) {
	var PortName = null;
	SerialPort.list(function (err, ports) {
		ports.forEach(function (port) {
			// console.log(port.comName);
			// console.log(port.pnpId);
			// console.log(port.manufacturer);
			if (port.manufacturer == 'FTDI') {
				PortName = port.comName;
			}
		});
		if (callback) callback(PortName);
	});
}
function array2string(d) {
	var s = '';
	for (var i in d) {
		s += String.fromCharCode(d[i]);
	}
	return s;
}
function Timer(fn, t) {
	var timerObj = setInterval(fn, t);

	this.stop = function () {
		if (timerObj) {
			clearInterval(timerObj);
			timerObj = null;
		}
		return this;
	}

	// start timer using current settings (if it's not already running)
	this.start = function () {
		if (!timerObj) {
			this.stop();
			timerObj = setInterval(fn, t);
		}
		return this;
	}

	// start with new interval, stop current interval
	this.reset = function (newT) {
		if (newT !== undefined) t = newT;
		return this.stop().start();
	}
}
function isNon(_obj) { return _obj === undefined ? true : false; }
function isNull(_obj) { return _obj === null ? true : false; }
