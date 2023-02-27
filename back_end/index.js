const express = require('express');
const cors = require('cors');
const { createKey, getCache, setCache } = require('./cache');
const { queryDb } = require('./db');

const app = express();

app.use(cors());
const port = 8000;

app.listen(port, () => {
	console.log(`App listening at http://localhost:${port}`);
});

app.get('/health', (req, res) => {
	res.set('Cache-control', 'no-cache');

	const healthResponse = {
		uptime: process.uptime(),
		message: 'OK',
		timestamp: Date.now(),
	};
	try {
		res.send(healthResponse);
	} catch (err) {
		healthResponse.message = err.toString();
		res.status(503).send(healthResponse);
	}
});

app.get('/kits', async (req, res) => {
	const cacheKey = createKey('kits', ['filterBy', 'page'], req.query);
	const cache = await getCache(cacheKey);

	try {
		if (cache.status === 'retrieved') {
			res.status(200).json(cache.data);
		} else {
			const queryResult = await queryDb(req.query);
			await setCache(cacheKey, queryResult, 1800);
			res.status(200).json(queryResult);
		}
	} catch {
		res.status(500);
	}
});
