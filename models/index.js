import { Sequelize } from "sequelize";
import db from "../utils/connection.js"
import Patient from "./PatientModels.js"
import Doctor from "./DoctorModels.js"
import Appointment from "./AppointmentModels.js"
import Treatment from "./TreatmentModels.js"
import Departement from "./DepartementModels.js"

await db.sync();
// await Patient.sync();
// await Doctor.sync();
// await Appointment.sync();
// await Treatment.sync();
// await Departement.sync();