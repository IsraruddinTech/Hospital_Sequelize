import { DataTypes } from "sequelize";
import db from "../utils/connection.js";
import Patient from "./PatientModels.js";  
import Doctor from "./DoctorModels.js"

const Treatment = db.define(
    "Treatment",
    {
        id_perawatan: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        tanggal_perawatan: {
            type: DataTypes.DATE,
            allowNull: false
        },
        deskripsi: {
            type: DataTypes.STRING,
            allowNull: false
        },
        id_pasien: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Patient,  
                key: "id_pasien"  
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        },
        id_dokter: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Doctor, 
                key: "id_dokter"  
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE'
        }
    },
    {
        tableName: "treatment",
    }
);

export default Treatment;
