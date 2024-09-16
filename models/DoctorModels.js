import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Departement from "./DepartementModels.js";

const Doctor = db.define(
  "Doctor",
  {
    id_dokter: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spesialisasi: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_departemen: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Departement,
        key: "id_departemen",
      },
    },
  },
  {
    tableName: "doctor",
  }
);

// Relasi Doctor dengan Departement
Doctor.belongsTo(Departement, {
  foreignKey: "id_departemen",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Doctor;
