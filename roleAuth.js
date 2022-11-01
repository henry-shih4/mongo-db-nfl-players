function authRole(role) {
  return (req, res, next) => {
    if (req.user.role !== role) {
      res.status(401);
      res.send("not authorized");
    }
    next();
  };
}

module.exports = {
  authRole,
};
