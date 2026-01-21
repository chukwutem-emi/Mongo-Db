const mongoDb = require("mongodb");
const getDB = require("../util/database").getDB;
class Product {
  constructor(title, price, description, imageUrl, id, userId) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id ? new mongoDb.ObjectId(id) : null;
    this.userId = userId;

  }
  
  save() {
    const db = getDB();
    let dbOption;
    if (this._id) {
      // update the product
      dbOption = db.collection("products")
      .updateOne({_id: this._id}, {$set: this});
    } else {
      dbOption = db.collection("products").insertOne(this)
    }
    return dbOption
    .then((result) => {
      console.log(result);
    })
    .catch((err) => {
      console.log(err)
    })
  }
  static fetchALL() {
    const db = getDB()
    return db.collection("products").find()
    .toArray()
    .then((products) => {
      console.log(products);
      return products;
    })
    .catch((err) => {
      console.log(err);
    })
  };
  static fetchOne(id) {
    const db = getDB()
    return db.collection("products")
    .find({_id: new mongoDb.ObjectId(id)})
    .next()
    .then((product) => {
      console.log(product);
      return product;
    })
    .catch((err) => {
      console.log(err);
    })
  };
  static deleteOne(id) {
    const db = getDB();
    return db.collection("products")
    .deleteOne({_id: new mongoDb.ObjectId(id)})
    .then((result) => {
      console.log("Deleted!")
    })
    .catch((err) => {
      console.log(err)
    })
  };
};

module.exports = Product;
