const NBA = require("nba");
const WebSocket = require('ws').Server;
const wss = new WebSocket({ port: 8080 });
const connections = [];
wss.on('connection', handleConnection);

function handleConnection(client) {
	console.log("New Connection");
	connections.push(client);
	client.on('close', function () {
		console.log("connection closed");
		const position = connections.indexOf(client);
		connections.splice(position, 1);
	});

	/**
	 * Read Data from Client (web browser)
	 */
	client.on('message', function(e) {
		const json = JSON.parse(e);
		NBAobject[json.action](json);
	});
}

/**
 * Send Data to Client (web browser)
 * @param data
 */
function broadcast(data) {
	for (myConnection in connections) {
		connections[myConnection].send(data.toString());
	}
}

/**
 * API Calls
 * @type {{findPlayer: (function(*)), playerInfo: (function(*)), playerProfile: (function(*))}}
 */
const NBAobject = {

	findPlayer(json) {
		const data = NBA.findPlayer(json.value);
		broadcast(JSON.stringify({action: json.action, data: data}));
	},

	playerInfo(json) {
		NBA.stats.playerInfo(json.value).then(res => {
			broadcast(JSON.stringify({action: json.action, data: res}));
		});
	},

	playerProfile(json) {
		NBA.stats.playerProfile(json.value).then(res => {
			broadcast(JSON.stringify({action: json.action, data: res}));
		});
	}
};