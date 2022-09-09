import db from "../models/index.js";

const Product = db.products;

export const addProductController = async (req, res) => {
  const { title, description, price, published } = req.body;
  try {
    const product = await Product.create({
      title,
      description,
      price,
      published,
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getProductsController = async (req, res) => {
  try {
    const products = await Product.findAll({
      //   attributes: ["title", "price"], choose only the required attributes
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getSingleProductController = async (req, res) => {
  try {
    let { id } = req.params;
    const product = await Product.findOne({
      where: { id },
    });
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateProductController = async (req, res) => {
  const { title, description, price, published } = req.body;
  let { id } = req.params;
  try {
    const product = await Product.update(
      {
        title,
        description,
        price,
        published,
      },
      { where: { id } }
    );
    res.status(201).json("updated");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteProductController = async (req, res) => {
  try {
    let { id } = req.params;
    await Product.destroy({
      where: { id },
    });
    res.status(200).json("deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
