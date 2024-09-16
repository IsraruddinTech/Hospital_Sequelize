import Appointment from "../models/AppointmentModels.js";
import Patient from "../models/PatientModels.js";
import Doctor from "../models/DoctorModels.js";

export const getAllAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.findAll({
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
        res.status(200).json(appointments);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil semua data janji temu" });
    }
};

export const getAppointmentById = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByPk(id, {
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
        if (!appointment) {
            return res.status(404).json({ message: "data Janji temu tidak ditemukan" });
        }
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Terjadi kesalahan saat mengambil data janji temu" });
    }
};

export const createAppointment = async (req, res) => {
    try {
        const { tanggal_janji, status, id_pasien, id_dokter } = req.body;
        const appointment = await Appointment.create({ 
            tanggal_janji, 
            status, 
            id_pasien, 
            id_dokter 
        });
        res.status(200).json(appointment);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal membuat data janji temu baru" });
    }
};

export const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const { tanggal_janji, status, id_pasien, id_dokter } = req.body;
        const [updated] = await Appointment.update(
            { tanggal_janji, status, id_pasien, id_dokter }, 
            { where: { id } }
        );
        const updatedAppointment = await Appointment.findByPk(id);
        if (updated === 0) {
            return res.status(404).json({ message: "data Janji temu tidak ter-update" });
        }
        res.status(200).json(updatedAppointment);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal mengupdate data janji temu" });
    }
};

export const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Appointment.destroy({ where: { id } });
        if (deleted === 0) {
            return res.status(404).json({ message: "data Janji temu tidak ditemukan" });
        }
        res.status(200).json({ message: `Janji temu dengan ID ${id} berhasil dihapus` });
    } catch (error) {
        res.status(500).json({ error: error.message, message: "Gagal menghapus data janji temu" });
    }
};
