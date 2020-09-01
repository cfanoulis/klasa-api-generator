const { Middleware } = require('klasa-dashboard-hooks');

module.exports = class extends Middleware {

	constructor(...args) {
		super(...args, { priority: 10 });
	}

	run(request, response) {
		response.setHeader('Access-Control-Allow-Origin', this.client.options.dashboardHooks.origin);
		response.setHeader('Access-Control-Allow-Methods', 'GET, POST');
		response.setHeader('Access-Control-Allow-Headers', 'User-Agent, Content-Type');
		if (request.method === 'OPTIONS') return response.end('Why tho?');
		response.setHeader('Content-Type', 'application/json');
		return undefined;
	}

};
