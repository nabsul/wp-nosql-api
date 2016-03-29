module.exports = {
	register: require( 'good' ),
	options: {
		reporters: [ {
			reporter: require( 'good-console' ),
			events: { log: '*', request: '*', response: '*', error: '*' },
			config: {
				format: '', // makes it use ISO 8601 timestamps
			},
		} ],
	},
};
