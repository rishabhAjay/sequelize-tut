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
  try {
    const reviews = await Product.findAll({
      include: [
        {
          model: Review,
          as: "review",
          attributes: [
            [
              db.Sequelize.fn("sum", db.Sequelize.col("rating")),
              "sum_of_ratings",
            ],
          ],
        },
      ],

      subQuery: false,
      raw: true,
      having: { "review.sum_of_ratings": "4" },
      where: { id },
    });
    res.status(200).json(reviews);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
};

export const getReviewsWithProductController = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await Review.findAll({
      include: [
        {
          model: Product,
          as: "product",
        },
      ],
      where: { id, "$product.price$": 50 },

      subQuery: false,
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
