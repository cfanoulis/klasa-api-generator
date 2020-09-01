const { Route } = require('klasa-dashboard-hooks');

module.exports = class extends Route {

	constructor(...args) {
		super(...args, { route: 'ping' });
	}

	get(request, response) {
		return response.json({
			res: 'pong!'
		});
	}

};
