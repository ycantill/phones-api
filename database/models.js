module.exports = async (db) => {
  if (!db) {
    throw Error("You must provide a sequelize database instance.");
  }
  const { DataTypes } = require("sequelize");

  const Phone = db.define(
    "Phone",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      imageFileName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {}
  );

  const PhoneDetail = db.define(
    "PhoneDetail",
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      manufacturer: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      screen: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      processor: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      ram: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {}
  );

  Phone.hasOne(PhoneDetail);

  await db.sync({ force: true });

  return { Phone, PhoneDetail };
};
