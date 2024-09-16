import Patient from "../models/PatientModels.js";
import Appointment from "../models/AppointmentModels.js";
import Doctor from "../models/DoctorModels.js";
import Departement from "../models/DepartementModels.js";

const createHospitalSeeder = async () => {
    const patient = await Patient.create({
        nama: "Andi Hartanto",
        tanggal_lahir: new Date(1990, 5, 15),
        jenis_kelamin: "Laki-laki",
        alamat: "Jl. Merdeka No. 10",
        nomor_telepon: "081234567890",
    });

    const departement = await Departement.create({
        nama_departemen: "kedokteran",
        deskripsi_departemen: "banyak dokter",
    })

    const doctor = await Doctor.create({
        nama: "Dr. Susanti",
        spesialisasi: "Umum",
        id_departemen: departement.dataValues.id, 
    });

    const appointment1 = await Appointment.create({
        tanggal_janji: new Date(),
        status: "Scheduled",
        id_pasien: patient.dataValues.id,
        id_dokter: doctor.dataValues.id,
    });

    const appointment2 = await Appointment.create({
        tanggal_janji: new Date(),
        status: "Scheduled",
        id_pasien: patient.dataValues.id,
        id_dokter: doctor.dataValues.id,
    });

    const findAllAppointmentsByPatient = await Appointment.findAll({
        where: { id_pasien: patient.id },
        include: [
            {
                model: Doctor,
                as: "Doctor",
                required: true,
                attributes: ["id", "nama", "spesialisasi"],
            }
        ]
    });

    return { patient, findAllAppointmentsByPatient };
}

const { patient, findAllAppointmentsByPatient: appointments } = await createHospitalSeeder();

console.log(patient, appointments);
