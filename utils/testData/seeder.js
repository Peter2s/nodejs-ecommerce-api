const fs = require("fs");
// eslint-disable-next-line import/no-extraneous-dependencies, node/no-unpublished-require
require("colors");
const dotenv = require("dotenv");

dotenv.config({ path: "../../.env" });
const DBConnection = require("../../config/database");
const Product = require("../../models/productModel");


// connect to DB
DBConnection();

// Read data
const products = JSON.parse(fs.readFileSync("./products.json"));

// Insert data into DB
const insertData = async () => {
  try {
    await Product.create(products);

    console.log("Data Inserted".green.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// Delete data from DB
const destroyData = async () => {
  try {
    await Product.deleteMany();
    console.log("Data Destroyed".red.inverse);
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

// node seeder.js -d
if (process.argv[2] === "-i") {
  insertData();
} else if (process.argv[2] === "-d") {
  destroyData();
}
