'use strict';
var sys = require('util');
var serialport = require('serialport');
var net = require('net');
var xbee = require('xbee');

var config = {
  baudrate: 9600,
  parser: xbee.packetParser(),
  autoOpen:false
}

var HOST = '75.98.169.12';
var PORT = 9000;

var port = new serialport('/dev/ttyUSB2', config);
var client = new net.Socket();


/*client.connect({port: PORT, host: HOST}, function(err){
	if (err) { return console.log('Error connecting to server: ', err.message);}
	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	client.write('{"id_col":1,"tempext":25.95,"humext":74.94,"tempint":35.15,"humint":33.68,"metane":1.77,"co2":0.56,"date":"2016-12-10 1:00:20"}');
	client.destroy();
});*/

client.on('close',function(){
	console.log('Connection Close');
});

port.open(function (err) {
  if (err) { return console.log('Error opening port: ', err.message);}
  console.log('Listo para leer el puerto');
});

port.on('data', function(data) {
	//data = data.toString();
	console.log(data.data);
	client.connect({port: PORT, host: HOST}, function(err){
		if (err) { return console.log('Error connecting to server: ', err.message);}
		console.log('CONNECTED TO: ' + HOST + ':' + PORT);
		client.write(data.data.toString());
		//console.log(data.data);
		client.destroy();
	});
});