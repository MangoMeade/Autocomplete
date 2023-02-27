const Redis = require('redis');
const pick = require('lodash/pick');
const redisClient = Redis.createClient();
redisClient.connect();

function createKey(name, validParams, params) {
	const extractedParams = pick(params, validParams);

	return `${name},${JSON.stringify(extractedParams)}`;
}

async function setCache(key, value, cacheExpiration = 3600) {
	await redisClient.setEx(key, cacheExpiration, JSON.stringify(value));
	return { status: 'stored', data: {} };
}

async function getCache(key) {
	const cachedValues = await redisClient.get(key);

	if (cachedValues != null) {
		return { status: 'retrieved', data: JSON.parse(cachedValues) };
	}
	return { status: 'empty', data: {} };
}

module.exports = {
	createKey,
	getCache,
	setCache,
};
