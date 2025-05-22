const { Sequelize } = require('sequelize');
// const path = require('path');
// require('dotenv').config();

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: process.env.DB_STORAGE || './books.sqlite',
  // logging: false
});

module.exports = sequelize;

// import { Sequelize } from "sequelize";

// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: process.env.DB_STORAGE || './books.sqlite'
// });

// // export {sequelize};
// module.exports = sequelize;
