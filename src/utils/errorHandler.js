function errorHandler(fn) {
	return async function (req, res, next) {
		try {
			let nextCalled = false;
			const result = await fn(req, res, (params) => {
				nextCalled = true;
				next(params);
			});

			if (!res.headersSent && !nextCalled) {
				res.json(result);
			}
		} catch (e) {
			next(e);
		}
	};
}

module.exports = errorHandler;
