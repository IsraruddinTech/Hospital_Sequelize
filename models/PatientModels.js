import { DataTypes } from "sequelize";
import db from "../utils/connection.js";

const Patient = db.define(
    "Patient",
    {
        id_pasien: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        nama: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tanggal_lahir: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        jenis_kelamin: {
            type: DataTypes.STRING,
            allowNull: false
        },
        alamat: {
            type: DataTypes.STRING,
            allowNull: false
        },
        nomor_telepon: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        tableName: "patient"
    }
);

export default Patient;
