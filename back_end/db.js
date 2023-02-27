const conforms = require('lodash/conforms');
const chunk = require('lodash/chunk');
const filter = require('lodash/filter');
const KITS_SHIPPING_DATA = require('./data/KITS_SHIPPING_DATA.json');

const pageSize = 20;
const queryDb = ({ filterBy = '', page = '1' }) => {
	const filterResult = filter(
		KITS_SHIPPING_DATA,
		conforms({
			label_id: (label_id) => label_id.includes(filterBy),
		})
	);
	const paginatedResult = chunk(filterResult, pageSize)[page - 1] ?? [];
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			try {
				resolve(paginatedResult);
			} catch {
				reject('Database Error');
			}
		});
	});
};

module.exports = {
	queryDb,
};
