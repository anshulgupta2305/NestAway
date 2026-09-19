const { listingSchema } = require("../schema");
const ExpressError = require("../utils/ExpressError");

module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);

  if (error) {
    const message = error.details.map((detail) => detail.message).join(", ");
    return next(new ExpressError(message, 400));
  }

  next();
};
