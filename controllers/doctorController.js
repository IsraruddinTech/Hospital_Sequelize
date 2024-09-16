import Doctor from "../models/DoctorModels.js";
import Appointment from "../models/AppointmentModels.js";
import Treatment from "../models/TreatmentModels.js";

export const getAllDoctors = async (req, res) => {
    try {
        const doctors = await Doctor.findAll({
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
        res.status(200).json(doctors);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil semua data dokter" });
    }
};

export const getDoctorById = async (req, res) => {
    try {
        const { id } = req.params;
        const doctor = await Doctor.findByPk(id, {
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
        if (!doctor) {
            return res.status(404).json({ message: "data dokter tidak ditemukan" });
        }
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data dokter", error: error.message });
    }
};

export const createDoctor = async (req, res) => {
    try {
        const { nama, spesialisasi, id_departemen } = req.body;
        const doctor = await Doctor.create({ nama, spesialisasi, id_departemen });
        res.status(200).json(doctor);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat data dokter baru" });
    }
};

export const updateDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, spesialisasi, id_departemen } = req.body;
        const [updated] = await Doctor.update({ nama, spesialisasi, id_departemen }, { where: { id } });
        const updatedDoctor = await Doctor.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "Dokter tidak ter-update" });
        }
        res.status(200).json(updatedDoctor);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data dokter" });
    }
};

export const deleteDoctor = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Doctor.destroy({ where: { id } });
        res.status(200).json({ message: `Dokter dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus data dokter" });
    }
};
