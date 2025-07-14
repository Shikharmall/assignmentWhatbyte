const getTokenFromCookie = (req) => {
	const token = req.cookies?.access_token;
	if (!token) {
		return {
			status: "Failed",
			message: "There is no token attached to the header"
		};
	} else {
		return token;
	}
};

module.exports = getTokenFromCookie;
