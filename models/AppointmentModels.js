import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Patient from "./PatientModels.js";
import Doctor from "./DoctorModels.js";

const Appointment = db.define(
  "Appointment",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    tanggal_janji: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id_pasien: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Patient, // Referensi ke model Patient
        key: "id_pasien", // Pastikan primary key di Patient adalah id_pasien
      },
    },
    id_dokter: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Doctor, // Referensi ke model Doctor
        key: "id_dokter", // Pastikan primary key di Doctor adalah id_dokter
      },
    },
  },
  {
    tableName: "appointment",
  }
);

// Relasi Appointment dengan Doctor dan Patient
Appointment.belongsTo(Patient, {
  foreignKey: "id_pasien",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
Appointment.belongsTo(Doctor, {
  foreignKey: "id_dokter",
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});

export default Appointment;
