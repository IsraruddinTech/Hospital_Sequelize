import Departement from "../models/DepartementModels.js";
import Doctor from "../models/DoctorModels.js";

export const getAllDepartements = async (req, res) => {
    try {
        const departements = await Departement.findAll({
            include: [
                {
                    model: Doctor,
                    as: "Doctor", 
                },
            ],
        });
        res.status(200).json(departements);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil semua data departemen" });
    }
};

export const getDepartementById = async (req, res) => {
    try {
        const { id } = req.params;
        const departement = await Departement.findByPk(id, {
            include: [
                {
                    model: Doctor,
                    as: "Doctors",
                },
            ],
        });
        if (!departement) {
            return res.status(404).json({ message: "data Departemen tidak ditemukan" });
        }
        res.status(200).json(departement);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data departemen", error: error.message });
    }
};

export const createDepartement = async (req, res) => {
    try {
        const { nama_departemen, deskripsi } = req.body;
        const departement = await Departement.create({ nama_departemen, deskripsi });
        res.status(200).json(departement);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat data departemen baru" });
    }
};

export const updateDepartement = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama_departemen, deskripsi } = req.body;
        const [updated] = await Departement.update({ nama_departemen, deskripsi }, { where: { id } });
        const updatedDepartement = await Departement.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "data Departemen tidak ter-update" });
        }
        res.status(200).json(updatedDepartement);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data departemen" });
    }
};

export const deleteDepartement = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Departement.destroy({ where: { id } });
        res.status(200).json({ message: `Departemen dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus data departemen" });
    }
};
