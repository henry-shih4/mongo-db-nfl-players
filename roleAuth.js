function authRole(type) {
  return (req, res, next) => {
    if (req.user.role !== type) {
      res.status(401);
      return res.send("not allowed");
    }
    next();
  };
}

module.exports = {
  authRole,
};
