const slugify = require("slugify");

module.exports = (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name);
  next();
};
