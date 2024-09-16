import express from "express";
import { createPatient, deletePatient, getAllPatients, getPatientById, updatePatient } from "../controllers/patientController.js";
import { createDoctor, deleteDoctor, getAllDoctors, getDoctorById, updateDoctor } from "../controllers/doctorController.js";
import { createAppointment, deleteAppointment, getAllAppointments, getAppointmentById, updateAppointment } from "../controllers/appointmentController.js";
import { createTreatment, deleteTreatment, getAllTreatments, getTreatmentById, updateTreatment } from "../controllers/treatmentController.js";
import { createDepartement, deleteDepartement, getAllDepartements, getDepartementById, updateDepartement } from "../controllers/departementController.js";

const router = express.Router();

// PATIENT (Pasien)
router.get("/patients", getAllPatients); 
router.get("/patients/:id", getPatientById); 
router.post("/patients", createPatient); 
router.put('/patients/:id', updatePatient);
router.delete("/patients/:id", deletePatient);

// DOCTOR (Dokter)
router.get("/doctors", getAllDoctors);
router.get("/doctors/:id", getDoctorById);
router.post("/doctors", createDoctor);
router.put('/doctors/:id', updateDoctor);
router.delete("/doctors/:id", deleteDoctor);

// APPOINTMENT (Janji Medis)
router.get("/appointments", getAllAppointments);
router.get("/appointments/:id", getAppointmentById);
router.post("/appointments", createAppointment);
router.put('/appointments/:id', updateAppointment);
router.delete("/appointments/:id", deleteAppointment);

// TREATMENT (Perawatan)
router.get("/treatments", getAllTreatments);
router.get("/treatments/:id", getTreatmentById);
router.post("/treatments", createTreatment);
router.put('/treatments/:id', updateTreatment);
router.delete("/treatments/:id", deleteTreatment);

// DEPARTMENT (Departemen)
router.get("/departements", getAllDepartements);
router.get("/departements/:id", getDepartementById);
router.post("/departements", createDepartement);
router.put("/departements/:id", updateDepartement);
router.delete("/departements/:id", deleteDepartement);

export default router;
