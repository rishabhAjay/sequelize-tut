import express from "express";
import {
  addProductController,
  deleteProductController,
  getProductsController,
  getSingleProductController,
  updateProductController,
} from "../controllers/productController.js";

const router = express.Router();

/*
route: api/v1/applications
method: POST
description: post the application of a candidate
access: private
*/

router.post("/", addProductController);

router.get("/", getProductsController);

router.get("/:id", getSingleProductController);

router.put("/:id", updateProductController);

router.delete("/:id", deleteProductController);

export default router;
