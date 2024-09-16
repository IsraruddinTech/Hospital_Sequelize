import Patient from "../models/PatientModels.js";
import Appointment from "../models/AppointmentModels.js";
import Treatment from "../models/TreatmentModels.js";

export const getAllPatients = async (req, res) => {
    try {
        const patients = await Patient.findAll({
            include: [
                {
                    model: Appointment,
                    as: "Appointment", 
                },
                {
                    model: Treatment,
                    as: "Treatment", 
                },
            ],
        });
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil semua data pasien" });
    }
};

export const getPatientById = async (req, res) => {
    try {
        const { id } = req.params;
        const patient = await Patient.findByPk(id, {
            include: [
                {
                    model: Appointment,
                    as: "Appointments",
                },
                {
                    model: Treatment,
                    as: "Treatments",
                },
            ],
        });
        if (!patient) {
            return res.status(404).json({ message: "Data pasien tidak ditemukan" });
        }
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data pasien", error: error.message });
    }
};

export const createPatient = async (req, res) => {
    try {
        const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon } = req.body;
        const patient = await Patient.create({ nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat data pasien baru" });
    }
};

export const updatePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon } = req.body;
        const [updated] = await Patient.update({ nama, tanggal_lahir, jenis_kelamin, alamat, nomor_telepon }, { where: { id } });
        const updatedPatient = await Patient.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "data pasien tidak ter-update" });
        }
        res.status(200).json(updatedPatient);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data pasien" });
    }
};

export const deletePatient = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Patient.destroy({ where: { id } });
        res.status(200).json({ message: `data pasien dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus data pasien" });
    }
};
