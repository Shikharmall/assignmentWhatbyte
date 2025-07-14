const getTokenFromHeader = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    return token;
  } else {
    return {
      status: "Failed",
      message: "There is no token attached to the header"
    };
  }
};

module.exports = getTokenFromHeader;
