import db from "../models/index.js";

const Review = db.reviews;
const Product = db.products;

export const addReviewController = async (req, res) => {
  const { rating, description } = req.body;
  const { id } = req.params;
  console.log(id);
  try {
    const product = await Review.create({
      product_id: parseInt(id),
      rating,
      description,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAllReviewsController = async (req, res) => {
  const { id } = req.params;
  const reviews = await Product.findAll({
    include: [
      {
        model: Review,
        as: "review",
      },
    ],
    where: { id },
  });
  res.status(200).json(reviews);
};

export const getReviewsWithProductController = async (req, res) => {
  const { id } = req.params;
  const reviews = await Review.findAll({
    include: [
      {
        model: Product,
        as: "product",
      },
    ],
    where: { id },
  });
  res.status(200).json(reviews);
};
