import { DataTypes } from "sequelize";
import sequelize from "../config/sequelize.js";

const User = sequelize.define("User", {
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  credentialID: {
    type: DataTypes.BLOB,
  },
  publicKey: {
    type: DataTypes.BLOB,
  },
  counter: {
    type: DataTypes.INTEGER,
  },
});

export default User;