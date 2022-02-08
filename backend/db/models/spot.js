"use strict";
module.exports = (sequelize, DataTypes) => {
  const Spot = sequelize.define(
    "Spot",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      address: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 255],
        },
      },
      city: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 50],
        },
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 15],
        },
      },
      country: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 100],
        },
      },
      lat: DataTypes.DECIMAL,
      lng: DataTypes.DECIMAL,
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: [3, 150],
        },
      },
      price: { type: DataTypes.DECIMAL, allowNull: false },
      img_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [3, 255],
        },
      },
    },
    {}
  );

  Spot.createSpot = async function ({
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    price,
    user_id,
    img_link,
  }) {
    const newSpot = await Spot.create({
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      price,
      user_id,
      img_link,
    });
    return Spot.findByPk(newSpot.id);
  };

  Spot.associate = function (models) {
    // associations can be defined here
    Spot.belongsTo(models.User, { foreignKey: "user_id" });
  };

  return Spot;
};