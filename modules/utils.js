const fetch = require('node-fetch');

module.exports = {
	callAPI(url) {
		return fetch(url).then(res => res.json());
	},
	cutString(string, cutStart, cutEnd) {
		return string.substr(0, cutStart) + string.substr(cutEnd);
	},
};