const { Client: { plugin } } = require('klasa');

module.exports = {
	DashboardClient: require('./lib/Client'),
	Client: require('./lib/Client'),
	Server: require('./lib/http/Server'),
	KlasaIncomingMessage: require('./lib/http/KlasaIncomingMessage'),
	KlasaServerResponse: require('./lib/http/KlasaServerResponse'),
	Middleware: require('./lib/structures/Middleware'),
	MiddlewareStore: require('./lib/structures/MiddlewareStore'),
	Route: require('./lib/structures/Route'),
	RouteStore: require('./lib/structures/RouteStore'),
	constants: require('./lib/util/constants'),
	util: require('./lib/util/Util'),
	Util: require('./lib/util/Util'),
	[plugin]: require('./lib/Client')[plugin]
};