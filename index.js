import db from "./utils/connection.js"
import "./models/DoctorModels.js"
import "./models/PatientModels.js"
import "./models/AppointmentModels.js"
import "./models/DepartementModels.js"
import "./models/TreatmentModels.js"
import "./models/index.js"
import express from "express"
import bodyParser from "body-parser"
import router from "./routes/route.js"

const app = express();
const port = process.env.PORT;

// await db.sync({force:true})

app.use("/", router)

app.listen(port, () => {
    console.log(`server running at ${port}`)
})