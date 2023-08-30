import React, { useState, useEffect } from 'react'
import Header from '../components/Header';
import { Typography, Box, TextField, Grid, Card, CardMedia } from '@mui/material';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ImageSlider from "../components/ImageSlider";

import SnackBar from "../components/Snackbar";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import MuiAlert from "@mui/material/Alert";

const BASE_URL = "http://localhost:8000/api/v1";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Home = () => {
  const topImages =  ["https://nextbigtechnology.com/wp-content/uploads/2022/03/Doctor-On-Demand-App-Development-Solution_banner_img.png",
  "https://williamsonmedicalcenter.org/wp-content/uploads/2016/02/Doctor-talking-to-patient.jpg", 
  "https://www.ucsfhealth.org/-/media/project/ucsf/ucsf-health/article/hero/10-ways-to-get-the-most-from-doctor-visit-2x.jpg?h=1112&w=2880&hash=3EA1FFB624FCE4F568506EF0182231D7",
  "https://www.riomed.com/wp-content/uploads/2021/11/blogpost.jpg",
  "https://t3.ftcdn.net/jpg/02/60/79/68/360_F_260796882_QyjDubhDDk0RZXV9z7XBEw9AKnWCizXy.jpg"
  ]
  const [doctors, setDoctors] = useState([]);
  const [doctorsToDisplay, setDoctorsToDisplay] = useState([]);
  const [patient, setPatient] = useState();
  const navigate = useNavigate();
  const [showValidationError, setshowValidationError] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("");
  const [openBookForm, setOpenBookForm] = useState(false);
  const [date, setDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [doctorName, setDoctorName] = useState("");

  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    loadPatientByUser();
    loadDoctors();
  }, [])

  const loadDoctors = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/doctors`);
      if (response.data) {
        setDoctors(response.data);
        setDoctorsToDisplay(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const loadPatientByUser = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/patients/by-user/${localStorage.getItem("userId")}`);
      if (response.data) {
        setPatient(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleBookDoctor = async (doctor) => {
    setDoctorId(doctor.id)
    setDoctorName(doctor.name)
    if(!token){
      navigate("/login-register")
    }else{
      if(patient){
        setOpenBookForm(true);
      }else{
        navigate("/patient-dashboard");
      }
    }
  }

  const bookAppointment = async () => {
    if (
        date === ""
    ) {
        setshowValidationError(true);
    } else {
        const bookData = { patientName: patient.name, doctorName, date, doctorId, patientId: patient.id };
        try {
            const response = await axios({
                method: "post",
                url: BASE_URL + "/appointments/",
                headers: {
                    "content-type": "application/json",
                    Authorization: "Bearer " + token,
                },
                data: JSON.stringify(bookData)
            });

            if (response.data) {
                setOpenSnackbar(true);
                setSnackbarMessage("Appointment booked successfully");
                setSnackbarSeverity("success")
                setOpenBookForm(false);
            }
        } catch (err) {
            console.log(err);
            setOpenSnackbar(true);
            setSnackbarMessage("Some error occured while updating slot");
            setSnackbarSeverity("error")
        }
    }
};



  return (
    <div>
      <Header />
      <Box sx={{ mt: 8, maxWidth: "100%" }}>
      <SnackBar snackbarSeverity={snackbarSeverity} snackbarMessage={snackbarMessage} openSnackbar={openSnackbar}  setOpenSnackbar={setOpenSnackbar}/>
      <Dialog open={openBookForm} onClose={() => setOpenBookForm(false)}>
                <DialogTitle>Book Appointment</DialogTitle>
                <DialogContent>
                    {showValidationError && (
                        <Alert severity="error">All the fields are mandatory</Alert>
                    )}
                    <TextField
                        size="small"
                        label="Date"
                        fullWidth
                        type="date"
                        onChange={(e) => {
                            setshowValidationError(false);
                            setDate(e.target.value);
                        }}
                        value={date}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                      disabled
                        size="small"
                        label="Doctor Id"
                        fullWidth
                        value={doctorId}
                        type="text"
                        onChange={(e) => {
                            setshowValidationError(false);
                            setDoctorId(e.target.value);
                        }}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                        disabled
                        size="small"
                        label="Patient Name"
                        fullWidth
                        value={patient?.name}
                        type="text"
                        onChange={(e) => {
                            setshowValidationError(false);
                            setPatientName(e.target.value);
                        }}
                        sx={{ mt: 2 }}
                    />
                    <TextField
                      disabled
                        value={doctorName}
                        size="small"
                        label="Doctor Name"
                        fullWidth
                        type="text"
                        onChange={(e) => {
                            setshowValidationError(false);
                            setDoctorName(e.target.value);
                        }}
                        sx={{ mt: 2 }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenBookForm(false)}>Cancel</Button>
                    <Button onClick={() => bookAppointment()}>Book Appointment</Button>
                </DialogActions>
            </Dialog>
        <ImageSlider topImages={topImages} />

        <Box sx={{ display: "block",  justifyContent: "center", alignItems: "center", padding: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
            <Typography sx={{ fontSize: 25 }}>Doctors</Typography>
          </Box>
          <Box sx={{mt: 2}}>
            <Grid container spacing={10}>
              { doctorsToDisplay && doctorsToDisplay.map((doctors, index)=> {
              return <Grid key={index} item xs={12} sm={6} md={4} lg={4}>
                  <Card sx={{cursor: "pointer"}} onClick={()=> handleBookDoctor(doctors)}>
                    <Box flexDirection="column" display="flex" justifyContent="center" alignItems="center">
                    <CardMedia
                        component="img"
                        height="300"
                        width="200"
                        image="https://img.freepik.com/premium-vector/doctor-profile-with-medical-service-icon_617655-48.jpg?w=2000"
                        alt={"Img1"}
                        sx={{mb: 0}}
                    />
                    <Box sx={{display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column", mt: 1}}>
                      <Typography sx={{mt: 0}} >{doctors.name}</Typography>
                      <Typography sx={{mt: 0}} >{`Specialities: ${doctors.specialities}`}</Typography>
                      <Typography sx={{mt: 0}} >{`Fee: ${doctors.fee}`}</Typography>
                      <Typography sx={{mt: 0}} >{`Address: ${doctors.address}`}</Typography>
                      <Typography sx={{mt: 0}} >{`Time From: ${doctors.timeFrom}`}</Typography>
                      <Typography sx={{mt: 0}} >{`Time To: ${doctors.timeTo}`}</Typography>

                    </Box>
                    </Box>
                  </Card>
              </Grid>})}
            </Grid>
          </Box>
        </Box>
       
      </Box>
    </div>
  )
}

export default Home