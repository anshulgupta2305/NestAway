const express = require("express");
const mongoose = require("mongoose");

const Listing = require("../models/listing");
const ExpressError = require("../utils/ExpressError");
const wrapAsync = require("../utils/wrapAsync");
const { validateListing } = require("../middleware/validateListing");

const router = express.Router();

function validateObjectId(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return next(new ExpressError("Invalid listing ID.", 400));
  }
  next();
}

router.get(
  "/",
  wrapAsync(async (req, res) => {
    const listings = await Listing.find({});
    res.render("listings/index", { listings });
  })
);

router.get("/new", (req, res) => {
  res.render("listings/new");
});

router.get(
  "/:id",
  validateObjectId,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      throw new ExpressError("Listing not found.", 404);
    }

    res.render("listings/show", { listing });
  })
);

router.post(
  "/",
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = new Listing(req.body.listing);
    await listing.save();
    res.redirect(`/listings/${listing._id}`);
  })
);

router.get(
  "/:id/edit",
  validateObjectId,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      throw new ExpressError("Listing not found.", 404);
    }

    res.render("listings/edit", { listing });
  })
);

router.put(
  "/:id",
  validateObjectId,
  validateListing,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      req.body.listing,
      {
        new: true,
        runValidators: true
      }
    );

    if (!listing) {
      throw new ExpressError("Listing not found.", 404);
    }

    res.redirect(`/listings/${listing._id}`);
  })
);

router.delete(
  "/:id",
  validateObjectId,
  wrapAsync(async (req, res) => {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      throw new ExpressError("Listing not found.", 404);
    }

    res.redirect("/listings");
  })
);

module.exports = router;
