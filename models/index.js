import { config } from "../config/db-config.js";
import Sequelize, { DataTypes } from "sequelize";
import productModel from "./productModel.js";
import reviewsModel from "./reviewsModel.js";
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
  host: config.HOST,
  dialect: config.dialect,
  operatorsAliases: false,
  pool: config.pool,
  logging: false,
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err.message);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.products = productModel(sequelize, DataTypes);
db.reviews = reviewsModel(sequelize, DataTypes);

db.sequelize
  .sync({ force: false })
  .then(() => {
    console.log("synced");
  })
  .catch((err) => {
    console.log(err.message);
  });

db.products.hasMany(db.reviews, {
  foreignKey: "product_id",
  as: "review",
});

db.reviews.belongsTo(db.products, {
  foreignKey: "product_id",
  as: "product",
});

export default db;
