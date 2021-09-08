module.exports = () => {
  const { Sequelize } = require("sequelize");

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database/phones.sqlite",
  });

  return sequelize;
};
