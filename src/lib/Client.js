const { Client, util: { mergeDefault } } = require('klasa');
const { BaseManager } = require('discord.js');
const path = require('path');

const Server = require('./http/Server');
const RouteStore = require('./structures/RouteStore');
const MiddlewareStore = require('./structures/MiddlewareStore');
const DashboardUser = require('./structures/DashboardUser');
const { OPTIONS } = require('./util/constants');

class DashboardClient extends Client {


	constructor(config) {
		super(config);
		this.constructor[Client.plugin].call(this);
	}

	static [Client.plugin]() {
		mergeDefault(OPTIONS, this.options);

		this.server = new Server(this);

		this.routes = new RouteStore(this);

		this.middlewares = new MiddlewareStore(this);

		this.dashboardUsers = new BaseManager(this, undefined, DashboardUser);

		this
			.registerStore(this.routes)
			.registerStore(this.middlewares);

		const coreDirectory = path.join(__dirname, '../');

		this.routes.registerCoreDirectory(coreDirectory);
		this.middlewares.registerCoreDirectory(coreDirectory);

		this.server.listen(this.options.dashboardHooks.port);
	}

}

module.exports = DashboardClient;
