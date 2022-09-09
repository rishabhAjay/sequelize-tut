import express from "express";
import {
  addReviewController,
  getAllReviewsController,
  getReviewsWithProductController,
} from "../controllers/reviewController.js";

const router = express.Router();

/*
route: api/v1/applications
method: POST
description: post the application of a candidate
access: private
*/

router.post("/:id", addReviewController);

router.get("/:id", getAllReviewsController);

router.get("/review/:id", getReviewsWithProductController);
export default router;
