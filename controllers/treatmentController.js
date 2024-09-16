import Treatment from "../models/TreatmentModels.js";
import Patient from "../models/PatientModels.js";
import Doctor from "../models/DoctorModels.js";

export const getAllTreatments = async (req, res) => {
    try {
        const treatments = await Treatment.findAll({
            include: [
                {
                    model: Patient,
                    as: "Patient", 
                },
                {
                    model: Doctor,
                    as: "Doctor", 
                },
            ],
        });
        res.status(200).json(treatments);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil data semua perawatan" });
    }
};

export const getTreatmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const treatment = await Treatment.findByPk(id, {
            include: [
                {
                    model: Patient,
                    as: "Patient",
                },
                {
                    model: Doctor,
                    as: "Doctor",
                },
            ],
        });
        if (!treatment) {
            return res.status(404).json({ message: "data perawatan tidak ditemukan" });
        }
        res.status(200).json(treatment);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data perawatan", error: error.message });
    }
};

export const createTreatment = async (req, res) => {
    try {
        const { tanggal_perawatan, deskripsi, id_pasien, id_dokter } = req.body;
        const treatment = await Treatment.create({ tanggal_perawatan, deskripsi, id_pasien, id_dokter });
        res.status(200).json(treatment);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat data perawatan baru" });
    }
};

export const updateTreatment = async (req, res) => {
    try {
        const { id } = req.params;
        const { tanggal_perawatan, deskripsi, id_pasien, id_dokter } = req.body;
        const [updated] = await Treatment.update({ tanggal_perawatan, deskripsi, id_pasien, id_dokter }, { where: { id } });
        const updatedTreatment = await Treatment.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "data perawatan tidak ter-update" });
        }
        res.status(200).json(updatedTreatment);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data perawatan" });
    }
};

export const deleteTreatment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Treatment.destroy({ where: { id } });
        res.status(200).json({ message: `data perawatan dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus data perawatan" });
    }
};
