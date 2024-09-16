import { DataTypes } from "sequelize";
import db from "../utils/connection.js";


const Departement = db.define(
    "Departement",
    {
        id_departemen: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        nama_departemen: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        deskripsi_departemen: {
            type: DataTypes.STRING,
            allowNull: true  
        }
    },
    {
        tableName: "departement"  
    }
);

export default Departement;
